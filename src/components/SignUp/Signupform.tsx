"use client"

import Link from "next/link"
import { useId } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textbox } from "@/components/ui/textbox"

export function SignupForm() {
  const firstNameId = useId()
  const lastNameId = useId()
  const uoavcMemberId = useId()
  const hiwaMemberId = useId()
  const skillLevelId = useId()
  const practiceSkillId = useId()
  const paymentMethodId = useId()
  const paymentProofId = useId()

  return (
    <Card className="mx-auto w-[70%] border-3 border-brand-primary bg-transparent px-10 py-8">
      <form className="flex flex-col gap-10" onSubmit={() => null}>
        <label className="flex items-center gap-2 py-6 text-brand-primary text-lg">
          <input className="size-6 accent-brand-primary" name="oneSessionOnly" type="checkbox" />I
          will only sign up and attend one social session this week
        </label>

        <section className="flex flex-col gap-10">
          <div className="border-brand-yellow border-b-4 pb-8">
            <h2 className="font-heading text-5xl text-brand-primary uppercase">
              Personal information
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <label className="flex flex-col gap-1 text-brand-primary text-lg" htmlFor={firstNameId}>
              First Name*
              <Textbox
                id={firstNameId}
                name="firstName"
                placeholder="Enter your first name"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-brand-primary text-lg" htmlFor={lastNameId}>
              Last Name*
              <Textbox
                id={lastNameId}
                name="lastName"
                placeholder="Enter your last name"
                required
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-brand-primary text-lg" htmlFor={uoavcMemberId}>
            Are you a UOAVC member?*
            <Select name="uoavcMember" required>
              <SelectTrigger className="w-[calc((100%-3rem)/2)]" id={uoavcMemberId}>
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </label>
          <div className="text-brand-primary text-lg leading-relaxed">
            <p>*If you are currently not and wish to become a new member:</p>
            <p>
              Register through the link:{" "}
              <Link className="underline underline-offset-3" href="">
                Membership Form
              </Link>
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <div className="border-brand-yellow border-b-4 pt-12 pb-8">
            <h2 className="font-heading text-5xl text-brand-primary uppercase">General</h2>
          </div>
          <label className="flex flex-col gap-1 text-brand-primary text-lg" htmlFor={hiwaMemberId}>
            Do you have HIWA membership?*
            <Select name="hiwaMember" required>
              <SelectTrigger className="w-[calc((100%-3rem)/2)]" id={hiwaMemberId}>
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <div className="flex flex-col gap-3 text-brand-primary text-lg leading-relaxed">
            <label htmlFor={skillLevelId}>What is your volleyball experience level?</label>
            <p>
              <strong>Beginner:</strong> Never played / relatively new to volleyball, has none or
              few skills developed, doesn't really know all the rules.
            </p>
            <p>
              <strong>Intermediate:</strong> Has played for a while, has most skills developed but
              not to a high standard, knows most of the rules.
            </p>
            <p>
              <strong>Advanced:</strong> Has all the skills developed to a consistent level, has
              played for a while, knows all the rules.
            </p>
            <Select name="skillLevel">
              <SelectTrigger className="w-[calc((100%-3rem)/2)]" id={skillLevelId}>
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label
            className="flex flex-col gap-1 text-brand-primary text-lg"
            htmlFor={practiceSkillId}
          >
            What skill would you like to practice this week?
            <Select name="skillToPractice">
              <SelectTrigger className="w-[calc((100%-3rem)/2)]" id={practiceSkillId}>
                <SelectValue placeholder="Select skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passing">Passing</SelectItem>
                <SelectItem value="setting">Setting</SelectItem>
                <SelectItem value="hitting">Hitting</SelectItem>
                <SelectItem value="blocking">Blocking</SelectItem>
                <SelectItem value="serving">Serving</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </label>
        </section>

        <section className="flex flex-col gap-10">
          <div className="border-brand-yellow border-b-4 pt-12 pb-8">
            <h2 className="font-heading text-5xl text-brand-primary uppercase">Payment</h2>
          </div>
          <label
            className="flex flex-col gap-1 text-brand-primary text-lg"
            htmlFor={paymentMethodId}
          >
            How would you like to make your payment?*
            <Select name="paymentMethod" required>
              <SelectTrigger className="w-[calc((100%-3rem)/2)]" id={paymentMethodId}>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank-transfer">Bank transfer (before the session)</SelectItem>
                <SelectItem value="cash">Cash at sign-in</SelectItem>
                <SelectItem value="concession">Concession</SelectItem>
                <SelectItem value="credit">Credit from previous session</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <div className="text-brand-primary text-lg leading-relaxed">
            <p className="mb-4 font-bold">Bank transfer details:</p>
            <p>University of Auckland Volleyball Club</p>
            <p>12-3019-0053736-00</p>
            <br />
            <p>
              <strong>Reference:</strong> Full Name
            </p>
            <p>
              <strong>Code:</strong> Student ID (if applicable)
            </p>
            <p>
              <strong>Particulars:</strong> Date of the session you are attending
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 text-brand-primary text-lg">
            <p className="font-bold">
              Please upload a screenshot of your payment, or the coupon that you have received.
            </p>
            <input className="sr-only" id={paymentProofId} name="paymentProof" type="file" />
            <Button asChild size="md" variant="tertiary">
              <label htmlFor={paymentProofId}>Upload file</label>
            </Button>
          </div>
        </section>

        <div className="flex justify-center pt-4">
          <Button type="submit">Complete sign-up</Button>
        </div>
      </form>
    </Card>
  )
}
