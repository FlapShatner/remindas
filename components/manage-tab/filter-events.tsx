import { FC, useState } from "react"

import { cn } from "@/lib/utils"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "../icons"
import { Button } from "../ui/button"

const filters = [
  {
    value: "scheduled",
    label: "Scheduled",
  },
  {
    value: "sent",
    label: "Sent",
  },
]

interface FilterEventsProps {
  setIsScheduled: (isScheduled: boolean) => void
}

const FilterEvents: FC<FilterEventsProps> = ({ setIsScheduled }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("scheduled")
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between"
        >
          {filters.find((filter) => filter.value === value)?.label}
          <Icons.chevrons className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px]">
        <Command>
          <CommandGroup>
            {filters.map((filter) => (
              <CommandItem
                key={filter.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  setIsScheduled(currentValue === "scheduled")
                }}
              >
                <Icons.check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === filter.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {filter.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FilterEvents
