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
  initialData?: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceForm({
  onSubmit,
  initialData,
  open,
  onOpenChange,
}: InvoiceFormProps) {
  const isEditing = !!initialData;

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
    } else {
      setFormData({
        clientName: "",
        clientEmail: "",
        amount: 0,
        vatPercentage: 0,
        dueDate: "",
        status: "unpaid",
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="bg-(--primary-color) hover:bg-(--primary-color)/90 text-(--text-color-1) font-semibold px-6 py-5"
          onClick={() => {
            onOpenChange(true);
          }}
        >
          <BookText size={14} className="mr-2" />
          Create Invoice
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEditing ? "Edit Invoice" : "Create New Invoice"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Name */}
          <div>
            <label className="text-sm text-gray-300">Client Name</label>
            <Input
              type="text"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
              className="bg-slate-900 text-white"
              required
            />
          </div>

          {/* Client Email */}
          <div>
            <label className="text-sm text-gray-300">Client Email</label>
            <Input
              type="email"
              value={formData.clientEmail}
              onChange={(e) =>
                setFormData({ ...formData, clientEmail: e.target.value })
              }
              className="bg-slate-900 text-white"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm text-gray-300">Amount</label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              className="bg-slate-900 text-white"
              required
            />
          </div>

          {/* VAT Percentage */}
          <div>
            <label className="text-sm text-gray-300">VAT (%)</label>
            <Input
              type="number"
              value={formData.vatPercentage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vatPercentage: parseFloat(e.target.value) || 0,
                })
              }
              className="bg-slate-900 text-white"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm text-gray-300">Due Date</label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="bg-slate-900 text-white"
            />
          </div>

          {/* Summary */}
          <div className="flex justify-between text-gray-300">
            <p>VAT Amount: ₦{vatAmount.toFixed(2)}</p>
            <p className="font-semibold text-white">
              Total: ₦{total.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
            >
              {isEditing ? "Update Invoice" : "Create Invoice"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
