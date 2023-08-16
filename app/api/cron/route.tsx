import { NextResponse } from "next/server"
import moment from "moment-timezone"

import { prisma } from "@/lib/db"
import { sendMessage } from "@/app/api/cron/twilio"

export async function GET() {
  const date = new Date().toUTCString()
  const events = await prisma.event.findMany({
    where: {
      utcTime: {
        gte: moment(date).toDate(),
        lte: moment(date).add(1, "m").toDate(),
      },
    },
  })
  if (events.length < 1) {
    return NextResponse.json({ message: "No events", success: true })
  }
  if (events.length > 0) {
    events.forEach(async (event) => {
      const formattedEvent = {
        body: `${event.title}\n${event.body && event.body}`,
        number: event.number,
      }
      try {
        const result = await sendMessage(formattedEvent)
        console.log("Sent", result)
      } catch (e) {
        console.log("Error", e, "event:", formattedEvent)
        return NextResponse.json({ message: "Error", success: false })
      }
    })
    return NextResponse.json({ message: "Sent", success: true })
  }
}
