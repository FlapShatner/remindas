import { FC } from "react"
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

export const NumberSelect: FC<NumberSelectProps> = ({ onChange, Trigger }) => {
  const numbers = [{ value: "417-440-9290", label: "417-440-9290" }] as Number[]
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
