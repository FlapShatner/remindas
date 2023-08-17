import validator from "validator"
import z from "zod"

const isMobilePhone = (value: string) => {
  return validator.isMobilePhone(value, "en-US")
}

export const schema = z.object({
  number: z
    .string()
    .refine(isMobilePhone, "Please enter a valid phone number with area code."),
  title: z
    .string()
    .min(1, "Please enter a name for your reminder")
    .max(40, "Maximum 40 characters"),
  body: z.string().max(300, "Maximum 300 characters"),
  date: z.string().min(1, "Please enter a valid date"),
  time: z.string().min(1, "Please enter a valid time"),
  timeZone: z.string().min(1, "Please select a time zone"),
})
