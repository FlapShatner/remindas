import { currentUser } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/toaster"
import Landing from "@/components/landing"
import MainCard from "@/components/main-card"

export default async function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Landing />
    </section>
  )
}
