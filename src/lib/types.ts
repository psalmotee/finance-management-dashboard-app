export interface Invoice {
  id: string
  clientName: string
  clientEmail: string
  amount: number
  vatPercentage: number
  vatAmount: number
  total: number
  dueDate: string
  status: "paid" | "unpaid"
}
