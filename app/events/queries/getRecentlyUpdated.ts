// @ts-nocheck
import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

export default resolver.pipe(
  resolver.authorize(),
  async (input,ctx) => {
    const userId = ctx.session.userId
    const userEvents = await db.user.findUnique({ where: { id: userId }, include: { events: true } })
    // get the last event
    const lastEvent = userEvents.events[userEvents.events.length - 1]
    return lastEvent
  }
);
