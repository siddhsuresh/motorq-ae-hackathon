import { z } from "zod"
import { email } from "app/auth/validations"
export const EventToken = z.object({
  email,
  eventId: z.string(),
})
