import { FC } from "react"
import Link from "next/link"
import { UserProfile } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

interface PageProps {}

const UserProfilePage: FC<PageProps> = () => {
  return (
    <div className="relative max-w-4xl m-auto">
      <Button className="z-10 absolute top-8 right-16">
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
