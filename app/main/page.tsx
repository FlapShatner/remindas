import { redirect } from "next/navigation"
import { getAllEvents } from "@/server/getEvents"
import { auth } from "@clerk/nextjs"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainCard from "@/components/main-card"
import Manage from "@/components/manage"

interface MainProps {}

const Main = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/")
  }
  const events = await getAllEvents(userId)

  return (
    <div>
      <Tabs
        className="mb-3 mt-10 flex flex-col justify-center"
        defaultValue="create"
      >
        <TabsList className="m-auto w-min">
          <TabsTrigger value="create">Create Reminder</TabsTrigger>
          <TabsTrigger value="manage">Manage Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <MainCard userId={userId} />
        </TabsContent>
        <TabsContent value="manage">
          <Manage events={events} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Main
