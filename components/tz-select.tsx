import { FC } from "react"
import { Control, UseFormRegister } from "react-hook-form"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FormValues } from "./main-card"

interface TzSelectProps {
  options: {
    value: string
    label: string
  }[]
  onChange: (value: string) => void
}

const TzSelect: FC<TzSelectProps> = ({ options, onChange }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="timezone">Timezone</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Time Zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                US / {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TzSelect
