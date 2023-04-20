"use client"

import { FunctionComponent, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MainInput } from "@/components/main-input"

interface Props {}

const MainCard: FunctionComponent<Props> = () => {
  const numberRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLInputElement>(null)

  return (
    <Card className="m-auto w-full md:w-[560px]">
      <CardHeader>
        <CardTitle>Set A Reminder</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <MainInput
              ref={numberRef}
              id="number"
              type="tel"
              placeholder="Phone #"
              label="Your Phone #"
            />
            <div className="flex flex-col gap-2 md:flex-row">
              <MainInput
                ref={titleRef}
                id="title"
                type="text"
                placeholder="What's happening?"
                label="Remind me of:"
              />
              <MainInput ref={dateRef} id="date" type="date" label="On:" />
              <MainInput ref={timeRef} id="time" type="time" label="At:" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="body">Note</Label>
              <Textarea
                ref={bodyRef}
                id="body"
                placeholder="Want to include any details?"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="mt-4 w-1/2" variant="secondary">
              Create Reminder
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default MainCard
