"use client"

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "group/select-trigger flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border-[1.5px] border-brand-primary bg-white px-4 py-2 text-left font-body text-base text-brand-primary outline-none transition-colors duration-200 ease-in-out focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&>span]:truncate",
        className,
      )}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="pointer-events-none size-5 shrink-0 group-data-[state=open]/select-trigger:hidden"
        data-slot="select-trigger-icon"
        strokeWidth={2}
      />
      <ChevronUpIcon
        className="pointer-events-none hidden size-5 shrink-0 group-data-[state=open]/select-trigger:inline"
        data-slot="select-trigger-icon"
        strokeWidth={2}
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 0,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width) overflow-y-auto overflow-x-hidden rounded-xl bg-brand-white text-brand-primary shadow-md/20 data-[state=closed]:animate-out data-[state=open]:animate-in",
          className,
        )}
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="p-2">{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center py-1.5 pr-3 pl-3.5 font-body text-base text-brand-primary outline-none transition-colors duration-150 before:absolute before:top-0 before:left-0 before:h-full before:w-[3px] before:bg-brand-primary before:opacity-0 data-disabled:pointer-events-none data-[state=checked]:bg-brand-light-grey data-highlighted:bg-brand-light-grey data-disabled:opacity-50 data-[state=checked]:before:opacity-100 data-highlighted:before:opacity-100",
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn("px-4 py-1.5 font-body text-brand-primary text-sm opacity-70", className)}
      data-slot="select-label"
      {...props}
    />
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("-mx-1 pointer-events-none my-1 h-px bg-brand-light-grey", className)}
      data-slot="select-separator"
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-brand-primary",
        className,
      )}
      data-slot="select-scroll-up-button"
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-brand-primary",
        className,
      )}
      data-slot="select-scroll-down-button"
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
