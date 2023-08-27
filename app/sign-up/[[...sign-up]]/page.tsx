import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function Page() {
  return (
    <div className="my-10 flex w-full justify-center">
      <SignUp
        signInUrl="/sign-in"
        appearance={{
          baseTheme: dark,
          elements: {
            card: "border border-border bg-darkcard text-foreground",
            formFieldInput__phoneNumber: "bg-card",
            phoneInputBox: "bg-[#1E283D]",
            footerActionLink: "text-blue-500",
          },
        }}
      />
    </div>
  )
}
