import { ID, AppwriteException } from "appwrite";
import {
  account,
  databases,
  APPWRITE_DB_ID,
  APPWRITE_INVOICES_COLLECTION_ID,
} from "./appwrite";
import type { Invoice } from "./types";

export const authService = {
  async signup(email: string, password: string, name: string) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      return user;
    } catch (error) {
      if (error instanceof AppwriteException) throw new Error(error.message);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      await account.deleteSession("current").catch(() => null);
      await account.createEmailPasswordSession(email, password);
      return await account.get();
    } catch (error) {
      if (error instanceof AppwriteException) throw new Error(error.message);
      throw error;
    }
  },

  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      if (error instanceof AppwriteException) throw new Error(error.message);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      return await account.get();
    } catch {
      return null;
    }
  },
};

// Invoice Service
export const invoiceService = {
  // Create a new invoice
  async createInvoice(
    invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">
  ) {
    try {
      const response = await databases.createDocument(
        APPWRITE_DB_ID,
        APPWRITE_INVOICES_COLLECTION_ID,
        ID.unique(),
        {
          ...invoice,
          amount: parseFloat(invoice.amount as unknown as string),
          vatPercentage: parseFloat(invoice.vatPercentage as unknown as string),
          vatAmount: parseFloat(invoice.vatAmount as unknown as string),
          total: parseFloat(invoice.total as unknown as string),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      return response as Invoice;
    } catch (error) {
      if (error instanceof AppwriteException) throw new Error(error.message);
      throw error;
    }
  },

  // Get all invoices
  async getAllInvoices() {
    try {
      const response = await databases.listDocuments(
        APPWRITE_DB_ID,
        APPWRITE_INVOICES_COLLECTION_ID
      );
      // Map Appwrite documents to Invoice type
      return response.documents.map((doc: any) => ({
        id: doc.$id,
        clientName: doc.clientName,
        clientEmail: doc.clientEmail,
        amount: doc.amount,
        vatPercentage: doc.vatPercentage,
        vatAmount: doc.vatAmount,
        total: doc.total,
        dueDate: doc.dueDate,
        status: doc.status,
        createdAt: doc.createdAt,
      })) as Invoice[];
    } catch (error) {
      if (error instanceof AppwriteException) throw new Error(error.message);
      throw error;
    }
  },

  // Update existing invoice
  async updateInvoice(
    id: string,
    data: Partial<Omit<Invoice, "id" | "createdAt">>
  ) {
    try {
      const response = await databases.updateDocument(
        APPWRITE_DB_ID,
        APPWRITE_INVOICES_COLLECTION_ID,
        id,
        {
          ...data,
          amount:
            data.amount !== undefined
              ? parseFloat(data.amount as unknown as string)
              : undefined,
          vatPercentage:
            data.vatPercentage !== undefined
              ? parseFloat(data.vatPercentage as unknown as string)
              : undefined,
          vatAmount:
            data.vatAmount !== undefined
              ? parseFloat(data.vatAmount as unknown as string)
              : undefined,
          total:
            data.total !== undefined
              ? parseFloat(data.total as unknown as string)
              : undefined,
          updatedAt: new Date().toISOString(),
        }
      );
      return response as Invoice;
    } catch (error) {
      if (error instanceof AppwriteException) throw new Error(error.message);
      throw error;
    }
  },

  // Delete an invoice
  async deleteInvoice(id: string) {
    try {
      await databases.deleteDocument(
        APPWRITE_DB_ID,
        APPWRITE_INVOICES_COLLECTION_ID,
        id
      );
    } catch (error) {
      if (error instanceof AppwriteException) throw new Error(error.message);
      throw error;
    }
  },

  // Get invoice by ID
  // ... other methods
  async getInvoiceById(id: string) {
    try {
      const doc = await databases.getDocument(
        APPWRITE_DB_ID,
        APPWRITE_INVOICES_COLLECTION_ID,
        id
      );
      return doc as Invoice;
    } catch (error) {
      if (error instanceof AppwriteException) throw new Error(error.message);
      throw error;
    }
  },
};
