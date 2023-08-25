import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { Accordion } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import EventItem from "./event-item"
import { ScrollArea } from "./ui/scroll-area"

interface ManageProps {
  events: any
}

const Manage = ({ events }) => {
  const { userId } = auth()
  if (!userId) {
    redirect("/")
  }

  return (
    <Card className="m-auto w-full border md:w-[560px] ">
      <CardHeader>
        <CardTitle className="text-2xl">Your Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length < 1 && <span>No reminders yet!</span>}
        <ScrollArea className="h-96">
          <Accordion type="single" collapsible>
            {events.map((event) => (
              <EventItem event={event} />
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default Manage
