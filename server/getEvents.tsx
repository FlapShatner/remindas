import { prisma } from "@/lib/db"

export const getEvents = async (userId: string) => {
  const events = await prisma.event.findMany({
    where: {
      userId,
    },
    orderBy: {
      dateTime: "asc",
    },
  })
  return events
}
