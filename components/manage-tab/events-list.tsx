import { FC } from "react"
import { Event } from "@prisma/client"

import { Accordion } from "@/components/ui/accordion"

import { ScrollArea } from "../ui/scroll-area"
import EventItem from "./event-item"

interface EventsListProps {
  events: Event[]
}

const EventsList: FC<EventsListProps> = ({ events }) => {
  return (
    <div>
      {events.length < 1 && <span>No reminders yet!</span>}
      <ScrollArea className="h-96">
        <Accordion type="single" collapsible>
          {events.map((event) => (
            <EventItem event={event} />
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}

export default EventsList
