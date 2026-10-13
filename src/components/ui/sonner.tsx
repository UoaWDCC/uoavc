"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import type { CSSProperties } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { cn } from "@/lib/utils"

function Toaster({ className, icons, style, toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      className={cn("toaster group", className)}
      closeButton
      containerAriaLabel="Notifications"
      duration={6000}
      icons={{
        success: <CircleCheckIcon aria-hidden="true" className="size-5" />,
        info: <InfoIcon aria-hidden="true" className="size-5" />,
        warning: <TriangleAlertIcon aria-hidden="true" className="size-5" />,
        error: <OctagonXIcon aria-hidden="true" className="size-5" />,
        loading: <Loader2Icon aria-hidden="true" className="size-5 animate-spin" />,
        ...icons,
      }}
      mobileOffset={{
        bottom: "max(16px, env(safe-area-inset-bottom))",
        left: 16,
        right: 16,
      }}
      offset={24}
      position="bottom-right"
      richColors
      style={
        {
          "--normal-bg": "var(--color-brand-white)",
          "--normal-text": "var(--color-brand-navy)",
          "--normal-border": "var(--color-brand-primary)",
          "--success-bg": "var(--color-brand-light-blue)",
          "--success-text": "var(--color-brand-navy)",
          "--success-border": "var(--color-brand-primary)",
          "--error-bg": "var(--color-brand-white)",
          "--error-text": "var(--color-brand-navy)",
          "--error-border": "var(--color-brand-yellow)",
          "--border-radius": "12px",
          fontFamily: "var(--font-inter), sans-serif",
          ...style,
        } as CSSProperties
      }
      theme="light"
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...toastOptions?.classNames,
          toast: cn("gap-3! border-2! p-4! text-sm!", toastOptions?.classNames?.toast),
          title: cn("font-semibold!", toastOptions?.classNames?.title),
          icon: cn("m-0! size-5!", toastOptions?.classNames?.icon),
          closeButton: cn(
            "focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2",
            toastOptions?.classNames?.closeButton,
          ),
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
