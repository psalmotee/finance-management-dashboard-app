"use client";

import { useState, useEffect } from "react";
import InvoiceForm from "./invoice-form";
import InvoiceTable from "./invoice-table";
import type { Invoice } from "@/lib/types";
import { Search, ListFilter, Eye, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { invoiceService } from "@/lib/auth-service"; // your Appwrite service wrapper


export default function InvoiceManager() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

 const fetchInvoices = async () => {
   try {
     const data = await invoiceService.getAllInvoices(); 
     setInvoices(data);
   } catch (error: any) {
     console.error("Fetch invoices failed:", error);
   }
 };


  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices =
    filter === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-(--gray-2) rounded-2xl gap-2 py-1 px-2">
          <Search size={18} />
          <input
            className="border-none outline-none bg-(--gray-2) text-(--text-color-1) placeholder:text-(--text-color-2) py-1.5 rounded-md"
            type="text"
            placeholder="Search invoices"
          />
        </div>

        <div className="flex gap-3">
          <InvoiceForm
            initialData={selectedInvoice}
            open={isDialogOpen}
            onOpenChange={(open) => {
              if (!open) setSelectedInvoice(null);
              setIsDialogOpen(open);
            }}
            onSuccess={fetchInvoices}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 h-10 border-none bg-(--gray-2) text-(--text-color-1) hover:bg-(--gray-5) cursor-pointer rounded-lg text-sm font-medium">
                <ListFilter size={16} />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
            >
              <DropdownMenuItem
                onClick={() => setFilter("all")}
                className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition-colors cursor-pointer"
              >
                  
                All ({invoices.length})
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setFilter("paid")}
                className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition-colors cursor-pointer"
              >
                Paid ({invoices.filter((inv) => inv.status === "paid").length})
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setFilter("unpaid")}
                className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition-colors cursor-pointer"
              >
                Unpaid (
                {invoices.filter((inv) => inv.status === "unpaid").length})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <InvoiceTable
        invoices={filteredInvoices}
        onEdit={(invoice) => {
          setSelectedInvoice(invoice);
          setIsDialogOpen(true);
        }}
        onSuccess={fetchInvoices}
      />
    </div>
  );
}
