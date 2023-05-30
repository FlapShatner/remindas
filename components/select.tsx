import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { FormValues } from "./main-card"
import { Label } from "./ui/label"

interface SelectProps {
  register: UseFormRegister<FormValues>
  name: keyof FormValues
  options: string[]
}

export function Select({ register, options, name, ...rest }) {
  return (
    <div>
      <Label htmlFor={name}>Time Zone</Label>
      <select {...register(name)} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Select
