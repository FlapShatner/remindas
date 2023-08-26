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
        <div className="flex items-center justify-center gap-4">
          <Icons.bell className="h-20 w-20  md:h-32 md:w-32" />
          <h1 className="text-center text-5xl font-semibold leading-3 md:text-8xl">
            Remindas
          </h1>
        </div>
        <div className="m-auto max-w-[300px]">
          <p className="mt-4 break-words text-center text-lg md:text-2xl">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="mt-16 flex flex-col justify-center gap-4">
        <Link className="m-auto" href="/sign-in">
          <Button className="w-48 text-lg ">Sign In</Button>
        </Link>
        <p className="text-center ">Or</p>
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
