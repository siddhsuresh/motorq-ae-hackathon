// @ts-nocheck
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx } from "@blitzjs/next"

export default resolver.pipe(
  resolver.authorize(),
  async (input,ctx:Ctx) => {
    //     // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    //     // const {
    //     //   items: events,
    //     //   hasMore,
    //     //   nextPage,
    //     //   count,
    //     // } = await paginate({
    //     //   skip,
    //     //   take,
    //     //   count: () => db.event.count({ where }),
    //     //   query: (paginateArgs) =>
    //     //     db.event.findMany({ ...paginateArgs, where, orderBy }),
    //     // });
    //     // get the current userId
    //     const userId = ctx.session.userId;
    //     // get the events for the current user
    //     const {
    //         items: events,
    //         hasMore,
    //         nextPage,
    //         count,
    //     } = await paginate({
    //         skip,
    //         take,
    //         count: () => user.events.length,
    //         query: (paginateArgs) =>
    //             db.user.findMany({...paginateArgs, where: { id: userId },orderBy }, { include: { events: true } })
    //     });
    //     const onlyEvents = events?.map(event => event.events);
    //     return {
    //       events:,
    //       nextPage,
    //       hasMore,
    //       count,
    //     };
    //   }
    const userId = input.userId;
    const userEvents = await db.user.findUnique({ where: { id: userId }, include: { events: true } })
    console.log(userEvents)
    return {
      events: userEvents.events,
    }
  }
)
