import { FC } from "react"

import { Checkbox } from "../ui/checkbox"

interface OptInProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

const OptInCheckbox: FC<OptInProps> = ({ checked, onCheckedChange }) => {
  const subtext = 'You can opt-out at any time online or by replying "STOP".'
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        id="optIn"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="optIn"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I opt-in to receive text message alerts at this number.
        </label>
        <p className="text-sm text-muted-foreground">{subtext}</p>
      </div>
    </div>
  )
}

export default OptInCheckbox
