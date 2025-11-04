export interface Invoice {
  $id?: string; // from Appwrite
  id?: string; // used locally
  clientName: string;
  clientEmail: string;
  amount: number;
  vatPercentage: number;
  vatAmount: number;
  total: number;
  dueDate: string;
  createdAt: string;
  updatedAt?: string;
  status: "paid" | "unpaid" | "pending";
  currentUser: string;
}
