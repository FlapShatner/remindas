import type { UserResource } from "@clerk/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const updateMetadata = async (
  user: UserResource | null | undefined,
  number: string,
  optIn: boolean
) => {
  try {
    const metadata = user?.unsafeMetadata
    if (!metadata) {
      const newMetadata = { 1: { number: number, optIn: optIn } }
      const response = await user?.update({
        unsafeMetadata: newMetadata,
      })
      if (response) {
        console.log(response)
      }
    }
    if (typeof metadata === "object") {
      const isNumberExist = Object.values(metadata).some(
        (item: any) => item.number === number
      )
      if (isNumberExist) {
        console.log("Number already exists!")
        return
      }
      const len = Object.keys(metadata).length
      const newMetadata = {
        ...metadata,
        [len + 1]: { number: number, optIn: optIn },
      }
      const response = await user?.update({
        unsafeMetadata: newMetadata,
      })
      if (response) {
        console.log(response)
      }
    }
  } catch (error) {
    console.log(error)
  }
}
