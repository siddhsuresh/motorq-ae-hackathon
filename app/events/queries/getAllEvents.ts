// @ts-nocheck
import { resolver } from "@blitzjs/rpc";
import db from "db";

export default resolver.pipe(
  async () => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const event = await db.event.findMany()

    return event;
  }
);
