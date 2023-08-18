/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { FunctionComponent, useEffect } from "react"
import { sendEvent } from "@/server/sendEvent"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { tzs } from "@/lib/tz"
import { schema } from "@/lib/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AddNumberForm from "@/components/add-number/add-number-form"
import { Icons } from "@/components/icons"
import { MainInput } from "@/components/main-input"
import { NumberSelect } from "@/components/number-select"

import ErrorMessage from "./error-message"
import TzSelect from "./tz-select"
import { useToast } from "./ui/use-toast"

interface Props {}

export type FormValues = {
  number: string
  title: string
  body: string
  date: string
  time: string
  timeZone: string
}

const MainCard: FunctionComponent<Props> = () => {
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const tz = tzs.filter((tz) => tz.value === userTz)[0].value

  const defaultValues = {
    number: "",
    title: "",
    body: "",
    date: "",
    time: "",
    timeZone: tz,
  }

  const { toast } = useToast()

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

    console.log(data)
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1">
            <div className="flex flex-col gap-2 md:flex-row">
              <Dialog>
                <Controller
                  name="number"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <NumberSelect
                      onChange={onChange}
                      Trigger={
                        <DialogTrigger className="w-full">
                          <div className=" mt-1 flex cursor-pointer items-center gap-3 rounded-sm bg-muted p-2">
                            <Icons.add className="h-6 w-6" />
                            <span>Add A Number</span>
                          </div>
                        </DialogTrigger>
                      }
                    />
                  )}
                />
                <DialogContent>
                  <DialogHeader>New Number</DialogHeader>
                  <AddNumberForm />
                </DialogContent>
              </Dialog>
            </div>
            <ErrorMessage>{errors.number?.message}</ErrorMessage>
            <MainInput
              id="title"
              type="text"
              placeholder="What's happening?"
              label="Remind me of:"
              register={register}
              name={"title"}
            />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <div className="mt-4 flex flex-col gap-2 md:flex-row">
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
                defaultValue={tz}
                render={({ field: { onChange } }) => (
                  <TzSelect tz={tz} onChange={onChange} />
                )}
              />
            </div>
            <ErrorMessage>
              {errors.date?.message ?? errors.time?.message ?? null}
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
      {/* <DevTool control={control} /> */}
    </Card>
  )
}

export default MainCard
