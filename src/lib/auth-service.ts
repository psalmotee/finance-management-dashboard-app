import { account, databases, APPWRITE_DB_ID, APPWRITE_INVOICES_COLLECTION_ID } from "./appwrite"
import { ID, AppwriteException } from "appwrite"
import type { Invoice } from "./types"

export const authService = {
  async signup(email: string, password: string, name: string) {
    try {
      const user = await account.create(ID.unique(), email, password, name)
      await account.createEmailPasswordSession(email, password)
      return user
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(error.message)
      }
      throw error
    }
  },

  async login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password)
      return await account.get()
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(error.message)
      }
      throw error
    }
  },

  async logout() {
    try {
      await account.deleteSession("current")
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(error.message)
      }
      throw error
    }
  },

  async getCurrentUser() {
    try {
      return await account.get()
    } catch (error) {
      return null
    }
  },
}

export const invoiceService = {
  async createInvoice(invoice: Omit<Invoice, "id">) {
    try {
      const response = await databases.createDocument(
        APPWRITE_DB_ID,
        APPWRITE_INVOICES_COLLECTION_ID,
        ID.unique(),
        invoice,
      )
      return response
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(error.message)
      }
      throw error
    }
  },

  async getInvoices() {
    try {
      const response = await databases.listDocuments(APPWRITE_DB_ID, APPWRITE_INVOICES_COLLECTION_ID)
      return response.documents as Invoice[]
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(error.message)
      }
      throw error
    }
  },

  async updateInvoice(id: string, data: Partial<Invoice>) {
    try {
      const response = await databases.updateDocument(APPWRITE_DB_ID, APPWRITE_INVOICES_COLLECTION_ID, id, data)
      return response
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(error.message)
      }
      throw error
    }
  },

  async deleteInvoice(id: string) {
    try {
      await databases.deleteDocument(APPWRITE_DB_ID, APPWRITE_INVOICES_COLLECTION_ID, id)
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(error.message)
      }
      throw error
    }
  },
}
