import { FC } from "react"
import { useUser } from "@clerk/nextjs"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { updateMetadata } from "@/lib/utils"
import { numberSchema } from "@/lib/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/add-number/add-number-input"

import ErrorMessage from "../error-message"
import OptInCheckbox from "./opt-in-checkbox"

interface AddNumberFormProps {
  setOpen: (open: boolean) => void
}

const AddNumberForm: FC<AddNumberFormProps> = ({ setOpen }) => {
  const form = useForm<z.infer<typeof numberSchema>>({
    resolver: zodResolver(numberSchema),
    defaultValues: { number: "", optIn: false },
  })

  const errors = form.formState.errors

  const { user } = useUser()

  const onSubmit = (values: z.infer<typeof numberSchema>) => {
    // console.log(values)
    updateMetadata(user, values.number, values.optIn)
    setOpen(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="000-000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ErrorMessage>{errors && errors.optIn?.message}</ErrorMessage>
        <FormField
          control={form.control}
          name="optIn"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <OptInCheckbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Add
        </Button>
      </form>
      {/* <DevTool control={form.control} /> */}
    </Form>
  )
}

export default AddNumberForm
