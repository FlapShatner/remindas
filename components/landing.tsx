import { FC } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { Icons } from "./icons"
import { Button } from "./ui/button"

interface LandingProps {}

const Landing: FC<LandingProps> = () => {
  const { userId } = auth()

  if (userId) {
    redirect("/main")
  }

  const subtitle = "Send yourself reminders so you don't forget stuff"
  return (
    <div className="m-auto w-max py-12">
      <div>
        <div className="flex gap-4 items-center justify-center">
          <Icons.bell className="h-32 w-32" />
          <h1 className="text-8xl leading-3 font-semibold text-center">
            Remindas
          </h1>
        </div>
        <p className="text-center mt-4 text-xl">{subtitle}</p>
      </div>
      <div className="mt-14 flex flex-col justify-center gap-2">
        <Link className="m-auto" href="/sign-in">
          <Button className="w-48 text-lg ">Sign In</Button>
        </Link>
        <p className="text-center">Or</p>
        <Link className="m-auto" href="/sign-up">
          <Button variant={"outline"} className="text-center">
            Create an account
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Landing
