import { Toaster } from "@/components/ui/toaster"
import MainCard from "@/components/main-card"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <MainCard />
      <Toaster />
    </section>
  )
}
