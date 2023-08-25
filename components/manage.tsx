import { redirect } from "next/navigation"
import { getEvents } from "@/server/getEvents"
import { auth } from "@clerk/nextjs"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import EventItem from "./event-item"
import { Icons } from "./icons"

interface ManageProps {}

const Manage = async () => {
  const { userId } = auth()
  if (!userId) {
    redirect("/")
  }
  const events = await getEvents(userId)

  return (
    <Card className="m-auto w-full border md:w-[560px] ">
      <CardHeader>
        <CardTitle className="text-2xl">Your Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length < 1 && <span>No reminders yet!</span>}
        <Accordion type="single" collapsible>
          {events.map((event) => (
            <EventItem event={event} />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default Manage
