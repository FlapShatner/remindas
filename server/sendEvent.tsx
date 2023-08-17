"use server"

import { formatInTimeZone, zonedTimeToUtc } from "date-fns-tz"

import { prisma } from "@/lib/db"
import { schema } from "@/lib/zod"
import { FormValues } from "@/components/main-card"

export const sendEvent = async (data: FormValues) => {
  const validatedData = schema.parse(data)

  const { number, title, body, date, time, timeZone } = validatedData

  // Combine the date and time into a single string, and convert to UTC taking into account the specific timezone
  const dateTimeString = formatInTimeZone(
    `${date}T${time}`,
    timeZone,
    "yyyy-MM-dd HH:mm:ssXXX"
  )

  const utcTime = zonedTimeToUtc(dateTimeString, timeZone)

  const response = await prisma.event.create({
    data: {
      number,
      title,
      body,
      dateTime: dateTimeString,
      timeZone,
      utcTime: utcTime.toISOString(),
    },
  })

  console.log("Response:", response)
}
