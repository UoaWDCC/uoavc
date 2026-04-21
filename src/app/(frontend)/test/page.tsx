import sendRegistrationConfirmation from "../../../lib/email/registrationConfirmation"

const sendTestEmail = async () => {
  "use server"

  await sendRegistrationConfirmation({
    to: "youdao005@gmail.com",
    sessionTitle: "Test Session",
    sessionDate: "2026-05-01",
    sessionTime: "10:00 AM",
    sessionLocation: "Room 101",
  })
}

const TestPage = () => {
  return (
    <div>
      <form action={sendTestEmail}>
        <button className="p-15 cursor-pointer" type="submit">
          Send Test Registration Confirmation Email
        </button>
      </form>
    </div>
  )
}

export default TestPage
