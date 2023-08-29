import { FC } from "react"

import { tzs } from "@/lib/tz"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TzSelectProps {
  onChange: (value: string) => void
  tz: string
}

const TzSelect: FC<TzSelectProps> = ({ onChange, tz }) => {
  const zones = tzs.map((zone) => {
    return {
      value: zone.value,
      label: zone.label,
    }
  })

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="timezone">Timezone</Label>
      <Select defaultValue={tz} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Time Zone" />
        </SelectTrigger>
        <SelectContent className="overflow-auto">
          <SelectGroup>
            {zones.map((zone) => (
              <SelectItem key={zone.value} value={zone.value}>
                {zone.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TzSelect
