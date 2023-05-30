import moment from "moment"

import { prisma } from "@/lib/db"
import { FormValues } from "@/components/main-card"

export const sendEvent = async (data: FormValues) => {
  "use server"
  const { number, title, body, date, time } = data
  const dateTime = moment(`${date} ${time}`)
  const response = await prisma.event.create({
    data: {
      number,
      title,
      body,
      dateTime: dateTime.toDate(),
    },
  })
  console.log(response)
}
