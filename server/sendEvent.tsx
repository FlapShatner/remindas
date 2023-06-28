import moment from "moment"

import { prisma } from "@/lib/db"
import { FormValues } from "@/components/main-card"

export const sendEvent = async (data: FormValues) => {
  "use server"
  const { number, title, body, date, time, timeZone } = data
  const dateTime = moment(`${date} ${time}`)
  const response = await prisma.event.create({
    data: {
      number,
      title,
      body,
      dateTime: dateTime.toDate(),
      timeZone,
    },
  })
  console.log(response)
}
