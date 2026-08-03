"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

export type TogglePillOption = {
  label: string
  value: string
}

type TogglePillGroupProps = {
  options: readonly [TogglePillOption, TogglePillOption]
  value: string
  onChange: (value: string) => void
  "aria-label": string
  className?: string
}

const pillItemClasses = cn(
  "h-auto rounded-full border-2 px-6 py-2 font-heading font-normal text-[2.75rem] uppercase leading-none",
  "transition-colors duration-200",
  "border-brand-primary bg-transparent text-brand-primary",
  // Selected pills must not change on hover. The plain hover: classes exist to
  // knock out the grey hover styles baked into the shadcn toggle base (cn
  // resolves the conflict in our favour); the data-[state=off] ones then beat
  // them on CSS specificity so only unselected pills get the hover effect.
  "hover:bg-brand-yellow hover:text-brand-primary data-[state=off]:hover:border-brand-yellow data-[state=off]:hover:text-brand-light-grey",
  // aria-pressed: is redundant with data-[state=on]: — it's only here to
  // override the base's aria-pressed:bg-muted.
  "aria-pressed:bg-brand-yellow data-[state=on]:bg-brand-yellow data-[state=on]:border-brand-yellow",
)

export function TogglePillGroup({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  className,
}: TogglePillGroupProps) {
  return (
    <ToggleGroup
      aria-label={ariaLabel}
      className={cn("gap-8", className)}
      onValueChange={(next) => {
        // Radix emits "" when the selected item is clicked again; ignore it so
        // one option is always selected.
        if (next) onChange(next)
      }}
      type="single"
      value={value}
    >
      {options.map((option) => (
        <ToggleGroupItem className={pillItemClasses} key={option.value} value={option.value}>
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
