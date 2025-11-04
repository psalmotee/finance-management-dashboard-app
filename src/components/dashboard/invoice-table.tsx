"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Invoice } from "@/lib/types";
import { Badge } from "../ui/badge";
import {  CircleCheckBig, Ellipsis, Eye, Pencil,  Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteConfirmation from "./delete-confirmation";
import { invoiceService } from "@/lib/auth-service";

interface InvoiceTableProps {
  invoices: Invoice[];
  onSuccess: () => void;
  onEdit: (invoice: Invoice) => void;
}

export default function InvoiceTable({
  invoices,
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

  const getClientInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (invoices.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-(--text-color-2)">
            No invoices found. Create one to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="text-(--text-color-2) text-left">
              <th className="px-6 py-4 font-medium text-sm">Name/Client</th>
              <th className="px-6 py-4 font-medium text-sm">Date</th>
              <th className="px-6 py-4 font-medium text-sm">Orders/Type</th>
              <th className="px-6 py-4 font-medium text-sm">Amount</th>
              <th className="px-6 py-4 font-medium text-sm">Status</th>
              <th className="px-6 py-4 font-medium text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className=" hover:bg-(--gray-5)">
                <td className="text-(--text-color-1) px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-(--gray-5) flex items-center justify-center text-xs font-semibold">
                      {getClientInitials(invoice.clientName)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {invoice.clientName}
                      </p>
                      <p className="text-[13px]">Inv: {invoice.id}</p>
                    </div>
                  </div>
                </td>
                <td className="text-sm font-medium text-(--text-color-1) px-6 py-4">
                  <div className="flex flex-col">
                    <p>
                      {new Date(invoice.dueDate).toLocaleDateString("en-NG")}
                    </p>
                    <p className="text-(--text-color-2) text-[13px] font-normal">
                      at{" "}
                      {new Date(invoice.dueDate).toLocaleTimeString("en-NG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </td>
                <td className="text-sm font-medium text-(--text-color-2) px-6 py-4">
                  20
                </td>
                <td className="text-sm font-medium text-(--text-color-1) px-6 py-4">
                  ₦
                  {invoice.amount.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </td>
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
                <td className="text-sm font-medium text-(--text-color-1) px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="h-8 w-8 p-0">
                        <Ellipsis color="var(--secondary-color)" size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-45 bg-white border border-(--gray-5) rounded-md shadow-lg overflow-hidden"
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          if (!invoice.id) return;
                          window.location.href = `/invoice-details?id=${invoice.id}`;
                        }}
                        className="w-full px-3 py-2 text-sm text-(--pending-text) hover:bg-(--gray-5) focus:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <span className="mr-2 inline-flex items-center">
                          <Eye size={16} />
                        </span>
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => toggleStatus(invoice)}
                        className="w-full px-3 py-2 text-sm text-(--secondary-color) hover:bg-(--gray-5) focus:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <span className="mr-2 inline-flex items-center">
                          <CircleCheckBig size={16} />
                        </span>
                        {invoice.status === "paid"
                          ? "Mark as Unpaid"
                          : "Mark as Paid"}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => onEdit(invoice)}
                        className="w-full px-3 py-2 text-sm text-(--badge-color) hover:bg-(--gray-5) focus:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <span className="mr-2 inline-flex items-center">
                          <Pencil size={16} />
                        </span>
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="w-full px-3 py-2 text-sm text-(--unpaid-text) hover:bg-(--unpaid-bg) focus:bg-(--unpaid-bg) transition-colors cursor-pointer"
                      >
                        <span className="mr-2 inline-flex items-center">
                          <Trash2 size={16} />
                        </span>
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
    </>
  );
}
