import { NextApiRequest, NextApiResponse } from "next"
import twilio from "twilio"

export default function sendMessage(req: NextApiRequest, res: NextApiResponse) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_PHONE_NUMBER
  const { to, body, sendAt } = req.body

  const client = twilio(accountSid, authToken)

  client.messages
    .create({
      from,
      body,
      sendAt,
      scheduleType: "fixed",
      to,
    })
    .then((message) => {
      res.status(200).json({ message })
    })
    .catch((err) => {
      res.status(500).json({ err })
    })
}
