import GitHubIcon from "~/icons/GitHubIcon";
import LinkedInIcon from "~/icons/LinkedInIcon";
import EmailIcon from "~/icons/EmailIcon";
import MapPinIcon from "~/icons/MapPinIcon";
import ClockIcon from "~/icons/ClockIcon";

export default function ContactInfo() {
  const formatterOptions = {
    timeZone: "Europe/Vienna",
    hour: "numeric",
    minute: "numeric",
  } satisfies Intl.DateTimeFormatOptions;
  const formatter = new Intl.DateTimeFormat([], formatterOptions);

  const date = formatter.format(new Date());
  const timezone = new Date()
    .toString()
    .match(/([\+-][0-9]+)/)![1]
    ?.replaceAll("0", " ")
    .trim();

  return (
    <div className="flex gap-12 pt-24 text-lg">
      <div className="mt-auto">
        <h1 className="w-min whitespace-break-spaces pb-2 text-6xl font-semibold">
          Igor Durica
        </h1>
        <p className="flex items-center gap-2">
          <MapPinIcon /> Bratislava, Slovakia
        </p>
        <p className="flex items-center gap-2">
          <ClockIcon /> {date} (GMT {timezone})
        </p>
      </div>
      <div className="flex flex-col gap-2 [&>*]:flex [&>*]:flex-col">
        <p>
          <span className="flex items-center gap-2">
            <GitHubIcon />
            <b>GitHub</b>
          </span>
          <a href="https://github.com/xduricai" className="hover:underline">
            github.com/xduricai
          </a>
        </p>
        <p>
          <span className="flex items-center gap-2">
            <LinkedInIcon />
            <b>LinkedIn</b>
          </span>
          <a
            href="https://linkedin.com/in/duricaigor"
            className="hover:underline"
          >
            linkedin.com/in/duricaigor
          </a>
        </p>
        <p>
          <span className="flex items-center gap-2">
            <EmailIcon />
            <b>Email</b>
          </span>
          <a href="mailto:duricaigor@gmail.com" className="hover:underline">
            duricaigor@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
