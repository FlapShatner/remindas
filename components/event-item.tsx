import { FC } from "react"

import { Icons } from "./icons"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

interface EventItemProps {
  event: {
    userId: string
    id: number
    number: string
    title: string
    body: string | null
    dateTime: string
    timeZone: string
    utcTime: Date
  }
}

const EventItem: FC<EventItemProps> = ({ event }) => {
  const date = new Date(event.dateTime).toDateString()
  const time = new Date(event.dateTime).toLocaleTimeString()

  function formatPhoneNumber(number) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
  }
  const phoneNumber = formatPhoneNumber(event.number)

  return (
    <AccordionItem className="mx-6" value={event.id.toString()} key={event.id}>
      <AccordionTrigger className="flex">
        <div className="flex w-full flex-col">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <span>{date}</span>
              <span>-</span>
              <span>{time}</span>
            </div>
            <span className="mr-6 text-secondary">{phoneNumber}</span>
          </div>
          <span className="text-start opacity-70">{event.title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex justify-between">
          <span className="">{event.body}</span>
          <div className="flex gap-5">
            <Icons.pencil className="h-5 w-5 cursor-pointer" />
            <Icons.trash className="h-5 w-5 cursor-pointer" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default EventItem
