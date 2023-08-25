import { FC } from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainCard from "@/components/main-card"
import Manage from "@/components/manage"

interface MainProps {}

const Main: FC<MainProps> = () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/")
  }

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
          <Manage />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Main
