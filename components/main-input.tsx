import { forwardRef } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  register: UseFormRegister<FieldValues>
}

const MainInput = forwardRef<HTMLInputElement, MainInputProps>(
  ({ type, id, placeholder, label, register, name, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor={id}>{label}</Label>
        <Input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          register={register}
          name={name}
          {...props}
        />
      </div>
    )
  }
)

MainInput.displayName = "MainInput"
export { MainInput }
