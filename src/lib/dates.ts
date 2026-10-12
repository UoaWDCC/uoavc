// Date formatting helpers for social session sign-up copy.
// Payload saves day-only dates as 12:00 UTC on the picked day, so read them in UTC
// to get the same day on the server and in every browser.

const TIME_ZONE = "UTC"

const partsFormatter = new Intl.DateTimeFormat("en-NZ", {
  weekday: "long",
  day: "numeric",
  month: "numeric",
  timeZone: TIME_ZONE,
})

const monthFormatter = new Intl.DateTimeFormat("en-NZ", { month: "long", timeZone: TIME_ZONE })

const getParts = (isoDate: string) => {
  const parts = partsFormatter.formatToParts(new Date(isoDate))
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ""
  return { weekday: get("weekday"), day: Number(get("day")), month: Number(get("month")) }
}

const ordinal = (day: number): string => {
  const suffixes = ["th", "st", "nd", "rd"]
  const mod100 = day % 100
  return `${day}${suffixes[(mod100 - 20) % 10] ?? suffixes[mod100] ?? suffixes[0]}`
}

/** Formats an ISO date as e.g. "Monday 27th July". */
export function formatSessionDateLong(isoDate: string): string {
  const { weekday, day } = getParts(isoDate)
  return `${weekday} ${ordinal(day)} ${monthFormatter.format(new Date(isoDate))}`
}

/** Formats an ISO date as e.g. "27/7" for sign-up step subheadings. */
export function formatSessionDateShort(isoDate: string): string {
  const { day, month } = getParts(isoDate)
  return `${day}/${month}`
}

/** Formats an ISO date as e.g. "Monday". */
export function formatSessionWeekday(isoDate: string): string {
  return getParts(isoDate).weekday
}
