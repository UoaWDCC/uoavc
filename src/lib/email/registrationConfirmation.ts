import payload from "payload"

interface RegistrationConfirmationEmailProps {
  to: string
  sessionTitle: string
  sessionDate: string
  sessionTime: string
  sessionLocation: string
}

const sendRegistrationConfirmation = async (props: RegistrationConfirmationEmailProps) => {
  const emailContent = `Hello,\n\nThank you for registering for ${props.sessionTitle}.\n\n The session is on ${props.sessionDate} at ${props.sessionTime} at ${props.sessionLocation}.\n\n Kind Regards,\n\n UOAVC Team`

  try {
    await payload.sendEmail({
      to: props.to,
      subject: `You're registered for ${props.sessionTitle}!`,
      text: emailContent,
    })
  } catch (error) {
    console.error("Error sending registration confirmation email:", error)
  }
}

export default sendRegistrationConfirmation
