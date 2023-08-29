"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { deleteEvent } from "@/server/deleteEvent"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"
import { useToast } from "../ui/use-toast"

interface DeleteEventProps {
  id: number
}

const DeleteEvent: FC<DeleteEventProps> = ({ id }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleClick = async () => {
    const success = await deleteEvent(id.toString())
    setOpen(false)
    if (success) {
      toast({
        description: "Event has been deleted.",
      })
      router.refresh()
    } else {
      toast({
        description: "Something went wrong. Please try again.",
      })
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost">
          <Icons.trash className="h-5 w-5 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>Delete Event</DialogHeader>
        <div className="flex flex-col gap-8">
          <span className="">Are you sure you want to delete this event?</span>
          <div className="flex justify-between">
            <Button
              onClick={() => setOpen(false)}
              className="w-32"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleClick} className="w-32">
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteEvent
