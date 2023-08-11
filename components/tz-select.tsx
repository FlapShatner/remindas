import { FC } from "react"
import moment from "moment-timezone"
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
  onChange: (value: string) => void
}

const TzSelect: FC<TzSelectProps> = ({ onChange }) => {
  const zonesForUS = moment.tz.zonesForCountry("US")
  const zones = zonesForUS.map((zone) => {
    const [country, city] = zone.split("/")
    return {
      value: zone,
      label: city,
    }
  })

  const tz = moment.tz.guess()
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="timezone">Timezone</Label>
      <Select defaultValue={tz} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Time Zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {zones.map((zone) => (
              <SelectItem key={zone.value} value={zone.value}>
                US / {zone.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TzSelect
