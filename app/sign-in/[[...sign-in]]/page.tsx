import { SignIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function Page() {
  return (
    <div className="mt-10 flex w-full justify-center">
      <SignIn
        signUpUrl="/sign-up"
        appearance={{
          baseTheme: dark,
          elements: {
            card: "border border-border bg-darkcard text-foreground",
          },
        }}
      />
    </div>
  )
}
