import { NextRequest, NextResponse } from "next/server"
import moment from "moment-timezone"

import { prisma } from "@/lib/db"
import { sendMessage } from "@/app/api/cron/sendMessage"

export async function POST(req: NextRequest) {
  const data = await req.json()
  sendMessage(data)
  return NextResponse.json({ message: "Success" })
}

export async function GET() {
  const date = new Date().toUTCString()
  const events = await prisma.event.findMany({
    where: {
      dateTime: {
        gte: moment(date).toDate(),
        lte: moment(date).add(1, "m").toDate(),
      },
    },
  })
  return NextResponse.json(events)
}
