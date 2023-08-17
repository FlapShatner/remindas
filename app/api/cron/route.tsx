import { NextResponse } from "next/server"

import { prisma } from "@/lib/db"
import { sendMessage } from "@/app/api/cron/twilio"

export async function GET() {
  const currentDate = new Date()
  const startDate = currentDate.toUTCString()
  const ISOStart = new Date(startDate).toISOString()
  const endDate = new Date(currentDate)
  endDate.setMinutes(endDate.getMinutes() + 1)
  const endUTC = endDate.toUTCString()
  const ISOEnd = new Date(endUTC).toISOString()

  const events = await prisma.event.findMany({
    where: {
      utcTime: {
        gte: ISOStart,
        lte: ISOEnd,
      },
    },
  })

  // console.log("ISOStart", ISOStart, "ISOEnd", ISOEnd)
  if (events.length < 1) {
    return NextResponse.json({ message: "No events", success: true })
  }

  try {
    await Promise.all(
      events.map(async (event) => {
        const formattedEvent = {
          body: `${event.title}\n${event.body || ""}`,
          number: event.number,
        }
        const result = await sendMessage(formattedEvent)
        console.log("Sent", result)
      })
    )
    return NextResponse.json({ message: "Sent", success: true })
  } catch (e) {
    console.log("Error", e)
    return NextResponse.json({ message: "Error", success: false })
  }
}
