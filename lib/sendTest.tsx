import type { FormValues } from "@/components/main-card"

export const sendTest = async (data: FormValues) => {
  const { number, title, body } = data

  try {
    const response = await fetch("/api/cron", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number, title, body }),
    })
    const json = await response.json()
    console.log(json)
  } catch (e) {
    console.log(e)
  }
}
