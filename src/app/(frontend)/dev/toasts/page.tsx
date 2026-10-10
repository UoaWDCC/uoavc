import { notFound } from "next/navigation"
import { ToastPreview } from "./toast-preview"

export default function ToastPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound()

  return <ToastPreview />
}
