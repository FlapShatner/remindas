import { FC } from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import MainCard from "@/components/main-card"

interface MainProps {}

const Main: FC<MainProps> = () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/")
  }

  return <MainCard />
}

export default Main
