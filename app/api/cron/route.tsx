import { NextResponse } from "next/server"

import { prisma } from "@/lib/db"
import { sendMessage } from "@/app/api/cron/twilio"

export const fetchCache = "force-no-store"
export const dynamic = "force-dynamic"

export async function GET() {
  const currentDate = new Date()
  const startDate = currentDate.toUTCString()
  const ISOStart = new Date(startDate).toISOString()
  const endDate = new Date(currentDate)
  endDate.setMinutes(endDate.getMinutes() + 1)
  const endUTC = endDate.toUTCString()
  const ISOEnd = new Date(endUTC).toISOString()

  const setSent = async (id: number) => {
    await prisma.event.update({
      where: {
        id,
      },
      data: {
        sent: true,
      },
    })
  }

  const events = await prisma.event.findMany({
    where: {
      utcTime: {
        gte: ISOStart,
        lte: ISOEnd,
      },
      sent: false,
    },
  })

  if (events.length < 1) {
    return NextResponse.json({ message: "No events", success: true })
  }

  try {
    await Promise.all(
      events.map(async (event) => {
        const formattedEvent = {
          body: `Reminder:\n${event.title}\n${event.body || ""}`,
          number: event.number,
        }
        await setSent(event.id)
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
