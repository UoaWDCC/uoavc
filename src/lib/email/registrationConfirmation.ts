import { getPayload } from "payload"
import config from "@/payload.config"

interface RegistrationConfirmationEmailProps {
  to: string
  sessionTitle: string
  sessionDate: string
  sessionTime: string
  sessionLocation: string
  isWaitlisted: boolean
}

const sendRegistrationConfirmation = async (props: RegistrationConfirmationEmailProps) => {
  const payload = await getPayload({ config: await config })

  const subject = props.isWaitlisted
    ? `You're on the waitlist for ${props.sessionTitle}`
    : `You're registered for ${props.sessionTitle}!`

  const intro = props.isWaitlisted
    ? `Hello,\n\nYou've been added to the waitlist for ${props.sessionTitle}. We'll notify you if a spot opens up.`
    : `Hello,\n\nThank you for registering for ${props.sessionTitle}.`

  const emailContent = `${intro}\n\nThe session is on ${props.sessionDate} at ${props.sessionTime} at ${props.sessionLocation}.\n\nKind Regards,\nUOAVC Team`

  try {
    await payload.sendEmail({
      to: props.to,
      subject,
      text: emailContent,
    })
  } catch (error) {
    console.error("Error sending registration confirmation email:", error)
  }
}

export default sendRegistrationConfirmation
