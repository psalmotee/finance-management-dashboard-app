"use client";

import { useState } from "react";
import { Ellipsis, Eye, CircleCheckBig, Pencil, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteConfirmation from "./delete-confirmation";
import { invoiceService } from "@/lib/auth-service";
import type { Invoice } from "@/lib/types";
import Link from "next/link";

interface RecentInvoicesProps {
  invoices: Invoice[];
  onSuccess: () => void;
  onEdit: (invoice: Invoice) => void;
}

export default function RecentInvoices({ invoices,
  onSuccess,
  onEdit,
}: InvoiceTableProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

   const handleDelete = async (id: string) => {
     try {
       await invoiceService.deleteInvoice(id);
       onSuccess();
       setSelectedInvoice(null);
     } catch (error: any) {
       console.error("Delete error:", error);
       alert("Failed to delete invoice: " + error.message);
     }
   };
  const getClientInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const toggleStatus = async (invoice: Invoice) => {
    try {
      await invoiceService.updateInvoice(invoice.id, {
        status: invoice.status === "paid" ? "unpaid" : "paid",
      });
      onSuccess();
    } catch (error: any) {
      console.error("Toggle status error:", error);
      alert("Failed to update status: " + error.message);
    }
  };

  return (
    <div className="mt-12">
      <div className="pb-4 flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-(--text-color-1)">
          Recent Invoice
        </h3>
        <Link
          href="./invoice-manager.tsx"
          className="flex items-center justify-center text-sm font-semibold text-(--secondary-color) hover:text-(--secondary-color)/80"
        >
          View All
          <ChevronRight className="ml-2" size={14} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-(--text-color-2) text-left">
              <th className="text-(--text-color-2) px-6 py-4 font-medium text-sm">
                Name/Client
              </th>
              <th className="px-6 py-4 font-medium text-sm">Date</th>
              <th className="px-6 py-4 font-medium text-sm">Orders/Type</th>
              <th className="px-6 py-4 font-medium text-sm">Amount</th>
              <th className="px-6 py-4 font-medium text-sm">Status</th>
              <th className="px-6 py-4 font-medium text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-(--gray-5) transition-colors"
              >
                {/* Client Info */}
                <td className="text-(--text-color-1) px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-(--gray-5) flex items-center justify-center text-xs font-semibold">
                      {getClientInitials(invoice.clientName)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {invoice.clientName}
                      </p>
                      <p className="text-(13px)">Inv: {invoice.id}</p>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="text-sm font-medium text-(--text-color-1) px-6 py-4">
                  <div className="flex flex-col">
                    <p>
                      {new Date(invoice.dueDate).toLocaleDateString("en-NG")}
                    </p>
                    <p className="text-(--text-color-2) text-(13px) font-normal">
                      at{" "}
                      {new Date(invoice.dueDate).toLocaleTimeString("en-NG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </td>

                {/* Order Count */}
                <td className="text-sm font-medium text-(--text-color-2) px-6 py-4">
                  20
                </td>

                {/* Amount */}
                <td className="text-sm font-medium text-(--text-color-1) px-6 py-4">
                  ₦
                  {invoice.amount.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </td>

                {/* Status */}
                <td className="text-sm font-medium text-(--text-color-1) px-6 py-4">
                  <Badge
                    variant="secondary"
                    className={
                      invoice.status === "paid"
                        ? "bg-(--paid-bg) text-(--paid-text) px-4 py-1 rounded-md"
                        : invoice.status === "pending"
                        ? "bg-(--pending-bg) text-(--pending-text) px-4 py-1 rounded-md"
                        : "bg-(--unpaid-bg) text-(--unpaid-text) px-4 py-1 rounded-md"
                    }
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </Badge>
                </td>

                {/* Actions */}
                <td className="text-sm font-medium text-(--text-color-1) px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 hover:bg-(--gray-5)"
                      >
                        <Ellipsis color="var(--secondary-color)" size={20} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-44 bg-white border border-(--gray-5) rounded-md shadow-lg overflow-hidden"
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          if (!invoice.id) return;
                          window.location.href = `/invoice-details?id=${invoice.id}`;
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-(--pending-text) hover:bg-(--gray-5) cursor-pointer"
                      >
                        <Eye size={16} />
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => toggleStatus(invoice)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-(--secondary-color) hover:bg-(--gray-5) cursor-pointer"
                      >
                        <CircleCheckBig size={16} />
                        {invoice.status === "paid"
                          ? "Mark as Unpaid"
                          : "Mark as Paid"}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => onEdit(invoice)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-(--badge-color) hover:bg-(--gray-5) cursor-pointer"
                      >
                        <Pencil size={16} />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-(--unpaid-text) hover:bg-(--unpaid-bg) cursor-pointer"
                      >
                        <Trash2 size={16} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedInvoice && (
              <DeleteConfirmation
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                itemName={selectedInvoice.clientName}
                onConfirm={() => handleDelete(selectedInvoice.id)}
              />
            )}
    </div>
    
  );
}
