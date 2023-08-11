/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { FunctionComponent, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { sendTest } from "@/lib/sendTest"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MainInput } from "@/components/main-input"

import ErrorMessage from "./error-message"
import TzSelect from "./tz-select"
import { useToast } from "./ui/use-toast"

interface Props {
  sendEvent: (data: FormValues) => void
}

export type FormValues = {
  number: string
  title: string
  body: string
  date: string
  time: string
  timeZone: string
}

const MainCard: FunctionComponent<Props> = ({ sendEvent }) => {
  const defaultValues = {
    number: "",
    title: "",
    body: "",
    date: "",
    time: "",
    timeZone: "",
  }

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
    timeZone: z.string().min(1, "Please select a time zone"),
  })

  const {
    control,
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      description: "Reminder set!",
    })
    sendEvent(data)
    // sendTest(data)
    // console.log(data)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues)
    }
  }, [isSubmitSuccessful, reset, formState])

  return (
    <Card className="m-auto w-full md:w-[560px]">
      <CardHeader>
        <CardTitle>Set A Reminder</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-1">
            <div className="flex flex-col gap-2 md:flex-row">
              <MainInput
                id="number"
                type="string"
                placeholder="000-000-0000"
                label="Your Phone #"
                register={register}
                name={"number"}
              />
              <MainInput
                id="title"
                type="text"
                placeholder="What's happening?"
                label="Remind me of:"
                register={register}
                name={"title"}
              />
            </div>
            <ErrorMessage>{errors.number?.message}</ErrorMessage>
            <div className="flex flex-col gap-2 md:flex-row">
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
              <Controller
                name="timeZone"
                control={control}
                render={({ field: { onChange } }) => (
                  <TzSelect onChange={onChange} />
                )}
              />
            </div>
            <ErrorMessage>
              {errors.title?.message ??
                errors.date?.message ??
                errors.time?.message ??
                null}
            </ErrorMessage>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="body">Note</Label>
              <Textarea
                id="body"
                placeholder="Want to include any details?"
                register={register}
                name={"body"}
              />
              <ErrorMessage>{errors.body?.message}</ErrorMessage>
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
