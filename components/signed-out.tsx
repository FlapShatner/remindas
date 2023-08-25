import { FC } from "react"

import { Skeleton } from "./ui/skeleton"

interface SignedOutProps {}

const SignedOutPlaceholder: FC<SignedOutProps> = () => {
  return <Skeleton className="h-7 w-7 rounded-full" />
}

export default SignedOutPlaceholder
