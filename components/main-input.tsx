import { forwardRef } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const MainInput = forwardRef<HTMLInputElement, MainInputProps>(
  ({ type, id, placeholder, label }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor={id}>{label}</Label>
        <Input ref={ref} id={id} type={type} placeholder={placeholder} />
      </div>
    )
  }
)

MainInput.displayName = "MainInput"
export { MainInput }
