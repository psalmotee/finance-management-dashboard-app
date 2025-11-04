import { Client, Account, Databases, Realtime } from "appwrite";

// Initialize Appwrite client
export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  
// Export reusable SDK services
export const account = new Account(client);
export const databases = new Databases(client);
export const realtime = new Realtime(client);
export const ID = {
  unique: () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },
};

//  Database and Collection IDs
export const APPWRITE_DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "";
export const APPWRITE_INVOICES_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID || "";


  