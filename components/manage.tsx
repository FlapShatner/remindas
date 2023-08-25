import { FC } from "react"

import { eventData } from "@/lib/testData"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Icons } from "./icons"

interface ManageProps {}

const Manage: FC<ManageProps> = () => {
  return (
    <Card className="m-auto w-full border md:w-[560px] ">
      <CardHeader>
        <CardTitle className="text-2xl">Your Reminders</CardTitle>
      </CardHeader>
      <Accordion type="single" collapsible>
        {eventData.map((event) => (
          <AccordionItem
            className="mx-6"
            value={event.id.toString()}
            key={event.id}
          >
            <AccordionTrigger className="flex">
              <div className="flex flex-col">
                <div className="flex gap-4">
                  <span>{event.date}</span>
                  <span>at</span>
                  <span>{event.time}</span>
                </div>
                <span className="text-start">{event.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between">
                <span>{event.body}</span>
                <div className="flex gap-5">
                  <Icons.pencil className="h-5 w-5 cursor-pointer" />
                  <Icons.trash className="h-5 w-5 cursor-pointer" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <CardContent></CardContent>
    </Card>
  )
}

export default Manage
