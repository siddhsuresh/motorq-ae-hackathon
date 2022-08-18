// @ts-nocheck
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateEvent = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  timeStart: z.date(),
  timeEnd: z.date(),
  latitude: z.number(),
  logitude: z.number(),
  size: z.number(),
});

export default resolver.pipe(
  resolver.zod(UpdateEvent),
  resolver.authorize("ADMIN"),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const event = await db.event.update({ where: { id }, data });

    return event;
  }
);
