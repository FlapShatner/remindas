import { FC } from "react"
import { useUser } from "@clerk/nextjs"

import { getNumbers } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"

interface NumberSelectProps {
  onChange: (value: string) => void
  Trigger: React.ReactNode
}

interface Number {
  value?: string
  label?: string
}

export const NumberSelect: FC<NumberSelectProps> = ({ onChange, Trigger }) => {
  const { user } = useUser()
  const numbers: Number[] = getNumbers(user)

  function formatPhoneNumber(number: any) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
  }

  return (
    <div className="m-auto flex w-full flex-col space-y-1.5">
      <div>
        <Label htmlFor="number">Mobile #</Label>
        <Select name="number" onValueChange={onChange}>
          <SelectTrigger className="w-[240px] text-xl">
            <Icons.phone className="h-5 w-5" />
            <SelectValue placeholder="000-000-0000" />
          </SelectTrigger>
          <SelectContent className="overflow-auto">
            <SelectGroup>
              {numbers &&
                numbers.length > 0 &&
                numbers.map((number) => (
                  <SelectItem
                    className="pl-12 text-lg"
                    key={number.value}
                    value={number.value as string}
                  >
                    {formatPhoneNumber(number.label)}
                  </SelectItem>
                ))}
              {Trigger}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
