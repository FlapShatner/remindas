"use server"

import twilio from "twilio"

export async function scheduleEvent(event: any) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const client = twilio(accountSid, authToken)
  const { title, date, time, body, number } = event
  const scheduledDate = new Date(`${date} ${time}`)
  console.log(scheduledDate)

  // const message = await client.messages.create({
  //     body: `${title} - ${body}`,
  //     from: process.env.TWILIO_PHONE_NUMBER,
  //     to: number,
  //     scheduleType: 'fixed'
  // });

  // return message;
}
