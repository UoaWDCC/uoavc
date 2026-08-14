import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const textboxVariants = cva(
  "w-full rounded-xl border-1 bg-white px-4 py-3 font-body text-xl transition-colors duration-200 ease-in-out focus:outline-none",
  {
    variants: {
      state: {
        default:
          "border-brand-primary text-brand-primary placeholder:text-brand-primary hover:placeholder:text-brand-yellow focus:border-brand-primary focus:text-brand-primary focus:placeholder:text-transparent",
        error:
          "border-brand-yellow text-brand-primary placeholder:text-brand-yellow focus:border-brand-yellow focus:placeholder:text-transparent",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
)

function Textbox({
  className,
  state,
  error,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof textboxVariants> & {
    error?: boolean
  }) {
  return (
    <input
      className={cn(textboxVariants({ state: error ? "error" : state, className }))}
      data-slot="textbox"
      {...props}
    />
  )
}

export { Textbox, textboxVariants }
