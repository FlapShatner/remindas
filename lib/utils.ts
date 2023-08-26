import type { UserResource } from "@clerk/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const updateNumber = async (
  user: UserResource | null | undefined,
  number: string
) => {
  try {
    const response = await user?.createPhoneNumber({
      phoneNumber: number,
    })
    if (response) {
      console.log(response)
    }
  } catch (error) {
    console.log(error)
  }
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

export const getNumbers = (user: UserResource | null | undefined) => {
  const userNumbers = user?.phoneNumbers
  if (userNumbers && userNumbers.length > 0) {
    const numbers = userNumbers.map((number) => {
      return {
        label: number.toString().substring(2),
        value: number.toString().substring(2),
      }
    })
    return numbers
  }
  return []
}

export const isFutureDate = (date: string, time: string) => {
  const inputDateTime = new Date(`${date}T${time}:00`)
  const currentDateTime = new Date()

  return inputDateTime > currentDateTime
}
