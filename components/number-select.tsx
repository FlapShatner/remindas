import { FC } from "react"
import { useUser } from "@clerk/nextjs"
import { UseFormRegister } from "react-hook-form"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Icons } from "./icons"

interface NumberSelectProps {
  onChange: (value: string) => void
  Trigger: React.ReactNode
}

interface Number {
  value: string
  label: string
}
interface UserMetadata {
  number: string
}

interface UserUnsafeMetadata {
  [key: string]: UserMetadata
}

export const NumberSelect: FC<NumberSelectProps> = ({ onChange, Trigger }) => {
  const { user } = useUser()
  const metadata = user?.unsafeMetadata as UserUnsafeMetadata
  let numbers = [] as Number[]

  const transformMetaData = (data: unknown) => {
    const metadata = data as UserUnsafeMetadata
    return Object.values(metadata).map(({ number }) => ({
      value: number,
      label: number,
    }))
  }

  if (metadata) {
    numbers = transformMetaData(metadata)
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <Label className="text-xl" htmlFor="number">
        Mobile #
      </Label>
      <Select name="number" onValueChange={onChange}>
        <SelectTrigger className="w-[240px] text-xl">
          <Icons.phone className="h-5 w-5" />
          <SelectValue placeholder="000-000-0000" />
        </SelectTrigger>
        <SelectContent className="overflow-auto">
          <SelectGroup>
            {numbers.length > 0 &&
              numbers.map((number) => (
                <SelectItem
                  className="pl-12 text-lg"
                  key={number.value}
                  value={number.value}
                >
                  {number.label}
                </SelectItem>
              ))}
            {Trigger}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
