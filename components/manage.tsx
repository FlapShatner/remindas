"use client"

import { FC, useState } from "react"
import type { Event } from "@prisma/client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import EventsList from "./events-list"
import FilterEvents from "./filter-events"

interface ManageProps {
  events: Event[]
}

const Manage: FC<ManageProps> = ({ events }) => {
  const scheduledEvents = events.filter((event: Event) => event.sent === false)
  const sentEvents = events.filter((event: Event) => event.sent === true)
  const [isScheduled, setIsScheduled] = useState(true)

  return (
    <Card className="m-auto w-full border md:w-[560px] ">
      <CardHeader className="flex flex-row items-center justify-between gap-8">
        <CardTitle className="text-xl sm:text-2xl">{`Your ${
          isScheduled ? "Scheduled" : "Sent"
        } Reminders`}</CardTitle>
        <FilterEvents setIsScheduled={setIsScheduled} />
      </CardHeader>
      <CardContent>
        <EventsList events={isScheduled ? scheduledEvents : sentEvents} />
      </CardContent>
    </Card>
  )
}

export default Manage
