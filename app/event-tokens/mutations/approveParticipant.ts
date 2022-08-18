// @ts-nocheck
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { ApproveParticipantType } from "../validations"

export class EventTokenReuseError extends Error {
  name = "EventTokenReuseError"
  message = "Event token is invalid or is being reused."
}

export class EventTokenSizeExeceded extends Error {
  name = "EventTokenSizeExeceded"
  message = "Event size exceeded."
}

export default resolver.pipe(
  resolver.zod(ApproveParticipantType),
  resolver.authorize("ADMIN"),
  async ({ token }) => {
    // 1. Try to find this token in the database
    // const hashedToken = hash256(token)
    const possibleToken = await db.eventToken.findFirst({
      where: { hashedToken: token, type: "EVENT_REG" },
      include: { user: true, event: true },
    })

    // 2. If token not found, error
    if (!possibleToken) {
      throw new EventTokenReuseError()
    }

    console.log(possibleToken)

    if (possibleToken.event.seatsLeft === 0) {
      throw new EventTokenSizeExeceded()
    }

    const savedToken = possibleToken

    // 3. Delete token so it can't be used again
    await db.eventToken.delete({ where: { id: savedToken.id } })

    // add the user to the event
    await db.event.update({
      where: { id: savedToken.eventId },
      data: {
        users: {
          connect: { id: savedToken.userId },
        },
        seatsLeft: savedToken.event.seatsLeft - 1,
      },
    })

    return true
  }
)
