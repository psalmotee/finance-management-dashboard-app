import { Client, Account, Databases } from "appwrite"

const client = new Client()

// Note: You'll need to set these environment variables in your Vercel project
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")

export const account = new Account(client)
export const databases = new Databases(client)

export const APPWRITE_DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || ""
export const APPWRITE_INVOICES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID || ""
