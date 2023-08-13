import { forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormValues } from "@/components/main-card"

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: keyof FormValues
  register: UseFormRegister<FormValues>
}

const MainInput = forwardRef<HTMLInputElement, MainInputProps>(
  ({ type, id, placeholder, label, register, name, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col space-y-1.5">
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
