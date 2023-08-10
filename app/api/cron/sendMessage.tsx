export const sendMessage = (data: { number: string; body: string }) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER
  const client = require("twilio")(accountSid, authToken)

  const { number, body } = data

  client.messages
    .create({
      body: body,
      from: phoneNumber,
      to: number,
    })
    .then((message) => console.log(message.sid))
}
