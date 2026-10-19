import path from "node:path"
import { fileURLToPath } from "node:url"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { resendAdapter } from "@payloadcms/email-resend"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
import { buildConfig } from "payload"
import sharp from "sharp"
import { Admin } from "./payload/collections/Admin"
import { CompTeams } from "./payload/collections/CompTeams"
import { Events } from "./payload/collections/Events"
import { Executives } from "./payload/collections/Executives"
import { FAQs } from "./payload/collections/FAQs"
import { Media } from "./payload/collections/Media"
import { SocialSessionRegistrations } from "./payload/collections/SocialSessionRegistrations"
import { SocialSessions } from "./payload/collections/SocialSessions"
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
  collections: [
    Admin,
    Users,
    Media,
    Executives,
    CompTeams,
    FAQs,
    Events,
    SocialSessions,
    SocialSessionRegistrations,
  ],
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
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
        // R2 rejects the AWS SDK's default upload checksums with a 400/501
        requestChecksumCalculation: "WHEN_REQUIRED",
      },
    }),
  ],
})
