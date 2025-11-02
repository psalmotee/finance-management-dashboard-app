"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Invoice } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Ellipsis, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface InvoiceTableProps {
  invoices: Invoice[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (invoice: Invoice) => void;
}

const getClientInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function InvoiceTable({
  invoices,
  onDelete,
  onToggleStatus,
  onEdit,
}: InvoiceTableProps) {
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
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="text-(--text-color-2)">
            <th className="px-4 py-3 text-left text-xs font-semibold text-(--text-color-2) uppercase">
              Name/Client
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-(--text-color-2) uppercase">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-(--text-color-2) uppercase">
              Orders/Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-(--text-color-2) uppercase">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-(--text-color-2) uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-(--text-color-2) uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-(--gray-3)">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-(--gray-5) flex items-center justify-center text-(--text-color-1) text-xs font-semibold`}
                  >
                    {getClientInitials(invoice.clientName)}
                  </div>
                  <div>
                    <p className="text-(--text-color-1) font-medium">
                      {invoice.clientName}
                    </p>
                    <p className="text-(--text-color-2) font-normal text-[13px]">
                      No
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-(--text-color-1) text-sm font-medium">
                <p>
                  {new Date(invoice.dueDate).toLocaleDateString("en-NG", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <span className="text-(--text-color-2) font-normal text-[13px]">
                  at{}
                </span>
              </td>
              <td className="px-4 py-4 text-(--text-color-1) text-sm font-medium">
                20
              </td>
              <td className="px-4 py-4 text-slate-900 dark:text-white font-medium">
                ₦
                {invoice.amount.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="px-4 py-4">
                <Badge
                  variant={invoice.status === "paid" ? "default" : "secondary"}
                  className={`text-xs font-medium rounded-md px-3 py-1 ${
                    invoice.status === "paid"
                      ? "bg-(--paid-bg) text-(--paid-text)"
                      : invoice.status === "pending"
                      ? "bg-(--pending-bg) text-(--pending-text)"
                      : "bg-(--unpaid-bg) text-(--unpaid-text)"
                  }`}
                >
                  {invoice.status === "paid"
                    ? "Paid"
                    : invoice.status === "pending"
                    ? "Pending"
                    : "Unpaid"}
                </Badge>
              </td>
              <td className="px-4 py-4">
                <Select
                  onValueChange={(val) => {
                    if (val === "toggle") onToggleStatus(invoice.id);
                    else if (val === "edit") onEdit(invoice);
                    else if (val === "delete") onDelete(invoice.id);
                  }}
                >
                  <SelectTrigger
                    className="flex items-center justify-center border-none bg-transparent shadow-none 
      [&>svg]:hidden cursor-pointer focus:ring-0 focus:outline-none"
                  >
                    <span className="rounded-md p-2 hover:bg-(--gray-5)">
                      <Ellipsis className="text-(--secondary-color)" />
                    </span>
                  </SelectTrigger>

                  <SelectContent className="bg-(--gray-2) text-(--text-color-1) border-(--gray-3) rounded-md shadow-md">
                    <SelectItem
                      value="toggle"
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer w-full rounded-md 
        data-[highlighted]:bg-(--gray-5) data-[highlighted]:text-(--text-color-1) transition-colors"
                    >
                      {invoice.status === "paid" ? (
                        <XCircle className="w-4 h-4 text-(--pending-text)" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-(--paid-text)" />
                      )}
                      {invoice.status === "paid" ? "Mark Unpaid" : "Mark Paid"}
                    </SelectItem>

                    <SelectItem
                      value="edit"
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer w-full rounded-md 
        data-[highlighted]:bg-(--gray-5) transition-colors"
                    >
                      <Edit className="w-4 h-4 text-(--pending-text)" />
                      Edit
                    </SelectItem>

                    <SelectItem
                      value="delete"
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer w-full rounded-md 
        data-[highlighted]:bg-(--gray-5) transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-(--unpaid-text)" />
                      Delete
                    </SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
