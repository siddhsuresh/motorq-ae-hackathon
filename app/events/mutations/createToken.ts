// @ts-nocheck
import { generateToken, hash256 } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import getUserEvents from "../queries/getUserEvents"
import { EventToken } from "../validations"

export default resolver.pipe(
  resolver.zod(EventToken),
  resolver.authorize(),
  async ({ email, eventId },ctx) => {
    // 1. Get the user
    const user = await db.user.findFirst({ where: { email: email.toLowerCase() } })

    // 2. Generate the token and expiration date.
    const token = generateToken()
    const hashedToken = hash256(token)

    // 3. If user with this email was found
    if (user) {
      // 4. Delete any existing password reset tokens
      await db.eventToken.deleteMany({ where: { type: "EVENT_REG", userId: user.id } })

      // get the event related to the eventId
      const event = await db.event.findFirst({ where: { id: eventId } })

      //check already registered events of the user
      const registeredEvents = await getUserEvents({},ctx)
      console.log(registeredEvents)

      //check if the user had any overlapping events that is the range of the start and end date of the new event
      const overlappingEvents = registeredEvents.events.filter((event) => {
        return (
          (event.timeStart <= event.timeStart && event.timeEnd >= event.timeStart) ||
          (event.timeStart <= event.timeEnd && event.timeEnd >= event.timeEnd)
        )
      })
        console.log(overlappingEvents)
      if (overlappingEvents.length > 0) {
        throw new Error("You are already registered for an event during this time.")
      }

      // 5. Save this new token in the database.
      await db.eventToken.create({
        data: {
          user: { connect: { id: user.id } },
          type: "EVENT_REG",
          hashedToken,
          event: { connect: { id: eventId } },
        },
      })
      // 6. Send the email
      // await forgotPasswordMailer({ to: user.email, token }).send()
    } else {
      // 7. If no user found wait the same time so attackers can't tell the difference
      await new Promise((resolve) => setTimeout(resolve, 750))
    }

    // 8. Return the same result whether a password reset email was sent or not
    return
  }
)
