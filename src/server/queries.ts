import "server-only";
import { db } from "./db";
import { env } from "~/env";

export async function getProjects(limit: number, offset: number) {
  const projects = await db.query.projects.findMany({
    limit,
    offset,
    columns: { name: true, description: true, githubUrl: true, siteUrl: true },
    orderBy: (projects, { desc }) => [
      desc(projects.id),
      desc(projects.createdAt),
    ],
    with: {
      projectsToTags: {
        with: {
          tag: {
            columns: { id: true, name: true, url: true },
          },
        },
      },
    },
  });

  return projects.map((pr) => ({
    name: pr.name,
    description: pr.description,
    githubUrl: pr.githubUrl,
    siteUrl: pr.siteUrl,
    tags: pr.projectsToTags.map((ptt) => ({
      id: ptt.tag.id,
      name: ptt.tag.name,
      url: ptt.tag.url,
    })),
  })) as Project[];
}

export async function getTags() {
  const tags = await db.query.tags.findMany({
    columns: { id: true, name: true, url: true },
    orderBy: (tags, { asc }) => [asc(tags.name)],
  });
  return tags as Tag[];
}

export async function getActivity() {
  const headers = {
    Authorization: `bearer ${env.GITHUB_TOKEN}`,
  };
  const body = {
    query: `query {
      viewer { 
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              firstDay
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`,
  };
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const res = (await response.json()) as ActivityResponse;
  return res.data.viewer.contributionsCollection;
}

type Tag = {
  id: number;
  name: string;
  url?: string;
};

type Project = {
  name: string;
  description: string;
  githubUrl: string;
  siteUrl: string;
  tags: Tag[];
};

type ActivityResponse = {
  data: {
    viewer: {
      contributionsCollection: {
        contributionCalendar: CalendarData;
      };
    };
  };
};

type CalendarData = {
  totalContributions: number;
  weeks: {
    firstDay: Date;
    contributionDays: {
      contributionCount: number;
      date: Date;
    }[];
  }[];
};