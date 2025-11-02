"use client";

import { useState, useEffect } from "react";
import { InvoiceForm } from "./invoice-form";
import { InvoiceTable } from "./invoice-table";
import type { Invoice } from "@/lib/types";
import { ListFilter, Search } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface InvoiceManagerProps {
  currentUser: string;
}

export function InvoiceManager({ currentUser }: InvoiceManagerProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");

  useEffect(() => {
    const stored = localStorage.getItem(`invoices_${currentUser}`);
    if (stored) setInvoices(JSON.parse(stored));
  }, [currentUser]);

  const saveInvoices = (updated: Invoice[]) => {
    localStorage.setItem(`invoices_${currentUser}`, JSON.stringify(updated));
    setInvoices(updated);
  };

  const handleAddInvoice = (invoice: Omit<Invoice, "id">) => {
    const newInvoice: Invoice = { ...invoice, id: Date.now().toString() };
    saveInvoices([...invoices, newInvoice]);
  };

  const handleDeleteInvoice = (id: string) => {
    saveInvoices(invoices.filter((inv) => inv.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    const updated = invoices.map((inv) =>
      inv.id === id
        ? { ...inv, status: inv.status === "paid" ? "unpaid" : "paid" }
        : inv
    );
    saveInvoices(updated);
  };

  const filteredInvoices =
    filter === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center rounded-2xl py-1 px-2 bg-(--gray-2) text-(--text-color-1) text-md">
          <Search size={18} className="ml-2 mr-2" />
          <input
            className="border-none outline-none bg-(--gray-2) text-(--text-color-1) placeholder:text-(--text-color-2) py-1.5 rounded-md"
            type="text"
            placeholder="Search invoices"
          />
        </div>

        <div className="flex gap-2">
          <InvoiceForm
            onSubmit={handleAddInvoice}
            triggerLabel="Create Invoice"
          />

          {/* Filter Tabs */}
          <Select value={filter} onValueChange={(val) => setFilter(val)}>
            <SelectTrigger
              className="flex items-center gap-2 border-none bg-transparent shadow-none 
    [&>svg]:hidden cursor-pointer focus:ring-0 focus:outline-none text-(--text-color-1)"
            >
              <span className="flex items-center gap-2 rounded-md p-2 hover:bg-(--gray-5)">
                {filter === "all" ? (
                  <>
                    <ListFilter className="w-4 h-4 text-(--secondary-color)" />
                    <span>Filters</span>
                  </>
                ) : (
                  <span>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </span>
                )}
              </span>
            </SelectTrigger>

            <SelectContent className="bg-(--gray-2) text-(--text-color-1) border-(--gray-3) rounded-md shadow-md">
              <SelectItem
                value="all"
                className="flex items-center gap-2 px-3 py-2 cursor-pointer w-full rounded-md 
      data-[highlighted]:bg-(--gray-5) transition-colors"
              >
                All ({invoices.length})
              </SelectItem>

              <SelectItem
                value="paid"
                className="flex items-center gap-2 px-3 py-2 cursor-pointer w-full rounded-md 
      data-[highlighted]:bg-(--gray-5) transition-colors"
              >
                Paid ({invoices.filter((inv) => inv.status === "paid").length})
              </SelectItem>

              <SelectItem
                value="unpaid"
                className="flex items-center gap-2 px-3 py-2 cursor-pointer w-full rounded-md 
      data-[highlighted]:bg-(--gray-5) transition-colors"
              >
                Unpaid (
                {invoices.filter((inv) => inv.status === "unpaid").length})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <InvoiceTable
        invoices={filteredInvoices}
        onDelete={handleDeleteInvoice}
        onToggleStatus={handleToggleStatus}
        onEdit={(invoice) => {
          const editComponent = document.createElement("div");
          document.body.appendChild(editComponent);
        }}
      />
    </div>
  );
}
