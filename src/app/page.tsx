import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";

import ContactInfo from "./_components/contactInfo";
import ActivityChart from "./_components/activityChart";
import { getActivity } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const activity = await getActivity();

  return (
    <main className="min-h-screen w-full max-w-4xl">
      <ContactInfo />

      <Tabs defaultValue="activity" className="w-full pt-24">
        <TabsList className="grid max-w-[400px] grid-cols-2">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you`&apos`re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1"></div>
              <div className="space-y-1"></div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <ActivityChart days={activity} />
        </TabsContent>
      </Tabs>
    </main>
  );
}