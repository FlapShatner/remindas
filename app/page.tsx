import moment from "moment-timezone"

import { prisma } from "@/lib/db"
import { Toaster } from "@/components/ui/toaster"
import MainCard, { FormValues } from "@/components/main-card"

export default function IndexPage() {
  const sendEvent = async (data: FormValues) => {
    "use server"
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

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <MainCard sendEvent={sendEvent} />
      <Toaster />
    </section>
  )
}
