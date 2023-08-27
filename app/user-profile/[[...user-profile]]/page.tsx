import { FC } from "react"
import Link from "next/link"
import { UserProfile } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

interface PageProps {}

const UserProfilePage: FC<PageProps> = () => {
  return (
    <div className="relative m-auto max-w-4xl">
      <Button className="absolute right-16 top-8 z-10">
        <Link href="/">Back</Link>
      </Button>
      <UserProfile
        appearance={{
          elements: {
            card: "bg-darkcard",
          },
        }}
        path="/user-profile"
        routing="path"
      />
    </div>
  )
}

export default UserProfilePage
