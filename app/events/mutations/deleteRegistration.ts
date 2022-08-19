// @ts-nocheck
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteEvent = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteEvent),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // remove the event from the user
    const userId = ctx.session.userId
    const user = await db.user.findFirst({ where: { id: userId } , include: {
        events: true
    }})
    const newEvents = user.events.filter((event) => event.id !== id)
    //get all the ids of the events as a JSON array {id: "id"}
    const newEventsIds = newEvents.map((event) => {
      return {id: event.id}
    })
    const result = await db.user.update({ where: { id: userId }, data: { 
        events:{
            set: newEventsIds
        }
    } })
    // update the event left seats count
    const event = await db.event.findFirst({ where: { id } })
    const newSeatsLeft = event.seatsLeft + 1
    await db.event.update({ where: { id }, data: { seatsLeft: newSeatsLeft } })
    return result
  }
)
