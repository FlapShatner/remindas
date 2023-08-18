import { FC } from "react"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { numberSchema } from "@/lib/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/add-number/add-number-input"

import OptInCheckbox from "./opt-in-checkbox"

interface AddNumberFormProps {}

const AddNumberForm: FC<AddNumberFormProps> = () => {
  const form = useForm<z.infer<typeof numberSchema>>({
    resolver: zodResolver(numberSchema),
    defaultValues: { number: "", optIn: false },
  })

  const onSubmit = (values: z.infer<typeof numberSchema>) => {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
