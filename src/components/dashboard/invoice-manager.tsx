"use client";

import { useState, useEffect } from "react";
import { InvoiceForm } from "./invoice-form";
import { InvoiceTable } from "./invoice-table";
import type { Invoice } from "@/lib/types";
import { Search, ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface InvoiceManagerProps {
  currentUser: string;
}

export function InvoiceManager({ currentUser }: InvoiceManagerProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load invoices from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`invoices_${currentUser}`);
    if (stored) setInvoices(JSON.parse(stored));
  }, [currentUser]);

  // Save invoices to localStorage
  const saveInvoices = (updated: Invoice[]) => {
    localStorage.setItem(`invoices_${currentUser}`, JSON.stringify(updated));
    setInvoices(updated);
  };

  // Handle create + edit together
  const handleFormSubmit = (invoiceData: Omit<Invoice, "id">) => {
    if (selectedInvoice) {
      const updated = invoices.map((inv) =>
        inv.id === selectedInvoice.id ? { ...inv, ...invoiceData } : inv
      );
      saveInvoices(updated);
    } else {
      const newInvoice: Invoice = { ...invoiceData, id: Date.now().toString() };
      saveInvoices([...invoices, newInvoice]);
    }
    setSelectedInvoice(null);
    setIsDialogOpen(false);
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

        <div className="flex gap-3">
          <InvoiceForm
            onSubmit={handleFormSubmit}
            initialData={selectedInvoice}
            open={isDialogOpen}
            onOpenChange={(open) => {
              if (!open) setSelectedInvoice(null);
              setIsDialogOpen(open);
            }}
          />

          {/* Filter Dropdown (Replaces old filter buttons) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg text-sm font-medium"
              >
                <ListFilter size={16} />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                All ({invoices.length})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("paid")}>
                Paid ({invoices.filter((inv) => inv.status === "paid").length})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("unpaid")}>
                Unpaid (
                {invoices.filter((inv) => inv.status === "unpaid").length})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <InvoiceTable
        invoices={filteredInvoices}
        onDelete={handleDeleteInvoice}
        onToggleStatus={handleToggleStatus}
        onEdit={(invoice) => {
          setSelectedInvoice(invoice);
          setIsDialogOpen(true);
        }}
      />
    </div>
  );
}
