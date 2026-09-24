import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: process.env.VERCEL ? undefined : "standalone",
}

export default withPayload(nextConfig)
