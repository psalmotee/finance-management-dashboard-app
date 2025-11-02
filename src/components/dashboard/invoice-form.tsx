"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Invoice } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookText } from "lucide-react";

interface InvoiceFormProps {
  onSubmit: (invoice: Omit<Invoice, "id">) => void;
  initialData?: Invoice;
  triggerLabel?: string;
}

export function InvoiceForm({
  onSubmit,
  initialData,
  triggerLabel = "Create Invoice",
}: InvoiceFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    amount: 0,
    vatPercentage: 0,
    dueDate: "",
    status: "unpaid" as const,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        clientName: initialData.clientName,
        clientEmail: initialData.clientEmail,
        amount: initialData.amount,
        vatPercentage: initialData.vatPercentage,
        dueDate: initialData.dueDate,
        status: initialData.status,
      });
    }
  }, [initialData]);

  const vatAmount = (formData.amount * formData.vatPercentage) / 100;
  const total = formData.amount + vatAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      amount: formData.amount,
      vatPercentage: formData.vatPercentage,
      vatAmount,
      total,
      dueDate: formData.dueDate,
      status: formData.status,
    });
    setOpen(false); // close dialog after submit
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-(--primary-color) hover:bg-(--primary-color)/90 text-(--text-color-1) font-semibold px-6 py-5">
          <BookText size={14} className="mr-2" />
          {initialData ? "Edit Invoice" : triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-white">
            {initialData ? "Edit Invoice" : "Create New Invoice"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Client Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
                required
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Client Email
              </label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.clientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, clientEmail: e.target.value })
                }
                required
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Amount (₦)
              </label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: Number.parseFloat(e.target.value) || 0,
                  })
                }
                step="0.01"
                required
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                VAT (%)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={formData.vatPercentage || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vatPercentage: Number.parseFloat(e.target.value) || 0,
                  })
                }
                step="0.01"
                required
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Due Date
              </label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-700/50 rounded-lg border border-slate-600">
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-2 uppercase">
                VAT Amount
              </p>
              <p className="text-2xl font-bold text-emerald-400">
                ₦
                {vatAmount.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-2 uppercase">
                Total
              </p>
              <p className="text-2xl font-bold text-blue-400">
                ₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-2 uppercase">
                Status
              </p>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "paid" | "unpaid",
                  })
                }
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white text-sm"
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
            >
              {initialData ? "Update Invoice" : "Create Invoice"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
