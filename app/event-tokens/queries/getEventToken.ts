// @ts-nocheck
import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetEventToken = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(
  resolver.zod(GetEventToken),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const eventToken = await db.eventToken.findFirst({ where: { id } , include: { event: true, user:true } });

    if (!eventToken) throw new NotFoundError();

    return eventToken;
  }
);
