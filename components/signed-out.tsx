import { FC } from "react"

interface SignedOutProps {}

const SignedOutPlaceholder: FC<SignedOutProps> = () => {
  return (
    <div className=" flex h-8 w-8 items-center justify-center rounded-full border border-border bg-transparent text-lg text-muted" />
  )
}

export default SignedOutPlaceholder
