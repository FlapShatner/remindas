import { NextResponse } from "next/server"

import { prisma } from "@/lib/db"

export const fetchCache = "force-no-store"

export async function GET() {
  const currentDate = new Date()
  const startDate = currentDate.toUTCString()
  const ISOStart = new Date(startDate).toISOString()
  const endDate = new Date(currentDate)
  endDate.setMinutes(endDate.getMinutes() + 1)
  const endUTC = endDate.toUTCString()
  const ISOEnd = new Date(endUTC).toISOString()

  //   const events = await prisma.event.findMany({
  //     where: {
  //       utcTime: {
  //         gte: ISOStart,
  //         lte: ISOEnd,
  //       },
  //     },
  //   })

  //   console.log("events", events)

  const response = await prisma.test.create({
    data: {
      currentDate: currentDate.toString(),
      startDate: startDate,
      endDate: endDate.toString(),
      ISOStart: ISOStart,
      endUTC: endUTC,
      ISOEnd: ISOEnd,
    },
  })

  return NextResponse.json({ message: "Sent", success: true, response })
}
