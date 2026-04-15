import path from "node:path"
import { fileURLToPath } from "node:url"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { resendAdapter } from "@payloadcms/email-resend"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { buildConfig } from "payload"
import sharp from "sharp"
import { Executives } from "./payload/collections/Executives"
import { Admin } from "./payload/collections/Admin"
import { Media } from "./payload/collections/Media"
import { Users } from "./payload/collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admin.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Admin, Users, Media, Executives],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "UOAVC",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  plugins: [],
})
