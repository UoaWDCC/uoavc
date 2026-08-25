// Date formatting helpers for social session sign-up copy.

const ordinal = (day: number): string => {
  const suffixes = ["th", "st", "nd", "rd"]
  const mod100 = day % 100
  return `${day}${suffixes[(mod100 - 20) % 10] ?? suffixes[mod100] ?? suffixes[0]}`
}

/** Formats an ISO date as e.g. "Monday 27th July". */
export function formatSessionDateLong(isoDate: string): string {
  const date = new Date(isoDate)
  const weekday = date.toLocaleDateString("en-NZ", { weekday: "long" })
  const month = date.toLocaleDateString("en-NZ", { month: "long" })
  return `${weekday} ${ordinal(date.getDate())} ${month}`
}

/** Formats an ISO date as e.g. "27/7" for sign-up step subheadings. */
export function formatSessionDateShort(isoDate: string): string {
  const date = new Date(isoDate)
  return `${date.getDate()}/${date.getMonth() + 1}`
}
