import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

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
  register: UseFormRegister<FormValues>
}

const TzSelect: FC<TzSelectProps> = ({ register }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="timezone">Timezone</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue {...register("timeZone")} placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="EST">US/Eastern</SelectItem>
            <SelectItem value="CST">US/Central</SelectItem>
            <SelectItem value="MST">US/Mountain</SelectItem>
            <SelectItem value="PST">US/Pacific</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TzSelect
