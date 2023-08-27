/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { FunctionComponent, useState } from "react"
import { useRouter } from "next/navigation"
import { sendEvent } from "@/server/sendEvent"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { tzs } from "@/lib/tz"
import { isFutureDate } from "@/lib/utils"
import { schema } from "@/lib/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MainInput } from "@/components/main-input"

import { DatePicker } from "./date-picker"
import ErrorMessage from "./error-message"
import { Icons } from "./icons"
import AddNumberForm from "./number/add-number-form"
import { NumberSelect } from "./number/number-select"
import TzSelect from "./tz-select"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog"
import { useToast } from "./ui/use-toast"

interface Props {
  userId: string
}

export type FormValues = {
  number: string
  title: string
  body: string
  date: string
  time: string
  timeZone: string
}

const MainCard: FunctionComponent<Props> = ({ userId }) => {
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const tz = tzs.filter((tz) => tz.value === userTz)[0].value
  const [open, setOpen] = useState(false)
  const defaultValues = {
    number: "",
    title: "",
    body: "",
    date: "",
    time: "",
    timeZone: tz,
  }

  const router = useRouter()

  const { toast } = useToast()

  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    clearErrors("date")
    const withNumber = {
      number: data.number,
      title: "",
      body: "",
      date: "",
      time: "",
      timeZone: tz,
    }
    if (isFutureDate(data.date, data.time)) {
      toast({
        description: "Reminder set!",
      })
      sendEvent(data, userId)
      reset(withNumber)
      router.refresh()
      console.log(data)
    } else {
      setError("date", {
        type: "manual",
        message: "Please choose a future date and time",
      })
      return
    }
  }

  return (
    <Card className="m-auto w-full border md:w-[560px] ">
      <CardHeader className="hidden sm:block">
        <CardTitle className=" text-2xl">New Reminder</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 sm:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1">
            <div className="flex gap-2 md:flex-row">
              <Dialog onOpenChange={setOpen} open={open}>
                <Controller
                  name="number"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <NumberSelect
                      onChange={onChange}
                      Trigger={
                        <DialogTrigger
                          onClick={() => setOpen(true)}
                          className="w-full"
                        >
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
                  <AddNumberForm setOpen={setOpen} />
                </DialogContent>
              </Dialog>
            </div>
            <ErrorMessage>{errors.number?.message}</ErrorMessage>
            <MainInput
              id="title"
              type="text"
              placeholder="Reminder name"
              label="Remind me of:"
              register={register}
              name={"title"}
            />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <div className=" flex w-full flex-col justify-between gap-4">
              <div className="mr-2 flex w-full gap-2 md:mr-0">
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <DatePicker onChange={onChange} />
                  )}
                />

                <MainInput
                  id="time"
                  type="time"
                  label="Time:"
                  register={register}
                  name={"time"}
                />
              </div>

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
