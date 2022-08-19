// @ts-nocheck
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateEvent = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  timeStart: z.string(),
  timeEnd: z.string(),
  latitude: z.number(),
  logitude: z.number(),
  size: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateEvent),
  resolver.authorize("ADMIN"),
  async ({ id, timeStart, timeEnd, ...data }) => {
    const timeStart_d = new Date(timeStart)
    const timeEnd_d = new Date(timeEnd)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const event = await db.event.update({
      where: { id },
      data: { ...data, timeStart: timeStart_d, timeEnd: timeEnd_d },
    })

    return event
  }
)
