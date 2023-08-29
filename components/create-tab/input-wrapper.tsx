import { FunctionComponent } from "react"

interface InputWrapperProps {
  children: React.ReactNode
}

const InputWrapper: FunctionComponent<InputWrapperProps> = ({ children }) => {
  return <div className="flex flex-col space-y-1.5">{children}</div>
}

export { InputWrapper }
