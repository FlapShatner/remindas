import moment from "moment-timezone"

import { prisma } from "@/lib/db"
import { Toaster } from "@/components/ui/toaster"
import MainCard, { FormValues } from "@/components/main-card"

export default function IndexPage() {
  const sendEvent = async (data: FormValues) => {
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

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <MainCard sendEvent={sendEvent} />
      <Toaster />
    </section>
  )
}
