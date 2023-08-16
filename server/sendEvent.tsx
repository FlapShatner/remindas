"use server"

// import moment from "moment-timezone"

// import { prisma } from "@/lib/db"
// import { FormValues } from "@/components/main-card"

// export const sendEvent = async (data: FormValues) => {
//   const { number, title, body, date, time, timeZone } = data
//   const dateTime = moment(`${date} ${time}`).tz(`${timeZone}`)

//   const response = await prisma.event.create({
//     data: {
//       number,
//       title,
//       body,
//       dateTime: dateTime.format(),
//       timeZone,
//       utcTime: dateTime.utc().format(),
//     },
//   })

//   console.log("Response:", response)
// }
import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz"

import { prisma } from "@/lib/db"
import { FormValues } from "@/components/main-card"

export const sendEvent = async (data: FormValues) => {
  const { number, title, body, date, time, timeZone } = data

  // Combine the date and time into a single string, and convert to UTC taking into account the specific timezone
  const dateTimeString = formatInTimeZone(
    `${date}T${time}`,
    timeZone,
    "yyyy-MM-dd HH:mm:ssXXX"
  )
  // const zonedDateTime = utcToZonedTime(dateTimeString, timeZone)
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
