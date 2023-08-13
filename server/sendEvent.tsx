"use server"

import moment from "moment-timezone"

import { prisma } from "@/lib/db"
import { FormValues } from "@/components/main-card"

export const sendEvent = async (data: FormValues) => {
  const { number, title, body, date, time, timeZone } = data
  const dateTime = moment(`${date} ${time}`).tz(`${timeZone}`)

  const response = await prisma.event.create({
    data: {
      number,
      title,
      body,
      dateTime: dateTime.format(),
      timeZone,
      utcTime: dateTime.utc().format(),
    },
  })
  console.log(response)
}
