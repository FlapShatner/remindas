"use server"

import { prisma } from "@/lib/db"

export const deleteEvent = async (id: string) => {
  try {
    const response = await prisma.event.delete({
      where: {
        id: Number(id),
      },
    })
    console.log("Response:", response)
    return { success: true }
  } catch (error) {
    console.error(error)
  }
}
