"use client"

import { FunctionComponent, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MainInput } from "@/components/main-input"

import ErrorMessage from "./error-message"
import { useToast } from "./ui/use-toast"

interface Props {}

const MainCard: FunctionComponent<Props> = () => {
  const { toast } = useToast()
  const schema = z.object({
    number: z
      .string()
      .min(10, "Please enter a valid phone number with area code."),
    title: z
      .string()
      .min(1, "Please enter a name for your reminder")
      .max(40, "Maximum 40 characters"),
    body: z.string().max(300, "Maximum 300 characters"),
    date: z.string().min(1, "Please enter the date you want to be reminded on"),
    time: z.string().min(1, "Please enter the time you want to be reminded at"),
  })

  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Data:", data)
    toast({
      description: "Reminder set!",
    })
  }
  return (
    <Card className="m-auto w-full md:w-[560px]">
      <CardHeader>
        <CardTitle>Set A Reminder</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <MainInput
              id="number"
              type="string"
              placeholder="Phone #"
              label="Your Phone #"
              register={register}
              name={"number"}
            />
            <ErrorMessage>{errors.number?.message}</ErrorMessage>
            <div className="flex flex-col gap-2 md:flex-row">
              <MainInput
                id="title"
                type="text"
                placeholder="What's happening?"
                label="Remind me of:"
                register={register}
                name={"title"}
              />
              <MainInput
                id="date"
                type="date"
                label="On:"
                register={register}
                name={"date"}
              />
              <MainInput
                id="time"
                type="time"
                label="At:"
                register={register}
                name={"time"}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="body">Note</Label>
              <Textarea
                id="body"
                placeholder="Want to include any details?"
                register={register}
                name={"body"}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="mt-4 w-1/2"
              variant="secondary"
            >
              Create Reminder
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default MainCard
