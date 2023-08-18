import { FC } from "react"

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
}

interface Number {
  value: string
  label: string
}

const NewNumber = () => {
  return (
    <div className=" mt-1 flex items-center gap-3 rounded-sm bg-muted p-2 cursor-pointer">
      <Icons.add className="h-6 w-6" />
      <span>Add New Number</span>
    </div>
  )
}

export const NumberSelect: FC<NumberSelectProps> = ({ onChange }) => {
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
                  className="pl-10 text-lg"
                  key={number.value}
                  value={number.value}
                >
                  {number.label}
                </SelectItem>
              ))}
            <NewNumber />
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
