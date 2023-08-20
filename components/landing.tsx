import { FC } from "react"
import Image from "next/image"

import { Icons } from "./icons"

interface LandingProps {}

const Landing: FC<LandingProps> = () => {
  const subtitle = "Schedule a reminder text so you don't forget stuff"
  return (
    <div className="m-auto w-max py-12">
      <div className="flex justify-center gap-5 text-7xl">
        <Icons.bell className="h-24 w-24" />
        <h1>Remindas</h1>
      </div>
      <p className="text-center">Schedule reminder text messages</p>
    </div>
  )
}

export default Landing
