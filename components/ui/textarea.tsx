import * as React from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<FieldValues>
  name: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, register, name, ...props }, ref) => {
    return (
      <textarea
        form="form"
        className={cn(
          "flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...register(name)}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
