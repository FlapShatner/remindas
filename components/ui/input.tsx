import * as React from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>
  name: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, register, name, placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...register(name)}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
