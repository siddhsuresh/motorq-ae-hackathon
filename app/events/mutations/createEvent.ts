// @ts-nocheck
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateEvent = z.object({
  title: z.string(),
  description: z.string(),
  timeStart: z.string(),
  timeEnd: z.string(),
  latitude: z.number(),
  logitude: z.number(),
  size: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize("ADMIN"),
  async (input) => {
    //convert timeStart and timeEnd to Date object
    const timeStart = new Date(input.timeStart)
    const timeEnd = new Date(input.timeEnd)
    const seatsLeft = input.size
    const event = await db.event.create({
      data: { ...input, timeStart, timeEnd, seatsLeft },
    })

    return event
  }
)
