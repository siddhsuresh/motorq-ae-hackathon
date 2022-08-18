// @ts-nocheck
import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetEventTokensInput
  extends Pick<
    Prisma.EventTokenFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetEventTokensInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: eventTokens,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.eventToken.count({ where }),
      query: (paginateArgs) =>
        db.eventToken.findMany({ ...paginateArgs, where, orderBy, include: { event: true, user:true } }),
    });

    return {
      eventTokens,
      nextPage,
      hasMore,
      count,
    };
  }
);
