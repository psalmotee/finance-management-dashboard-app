"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Invoice } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
              Name/Client
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
              Orders/Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b border-(--gray-3) hover:bg-(--gray-5) rounded-2xl transition-colors"
            >
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-(--gray-5) flex items-center justify-center text-(--text-color-1) text-xs font-semibold">
                    {getClientInitials(invoice.clientName)}
                  </div>
                  <div>
                    <p className="text-(--text-color-1) font-medium">
                      {invoice.clientName}
                    </p>
                    <p className="text-(--text-color-2) text-[13px]">No</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4 text-(--text-color-1) text-sm font-medium">
                {new Date(invoice.dueDate).toLocaleDateString("en-NG", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
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
                      : "bg-(--unpaid-bg) text-(--unpaid-text)"
                  }`}
                >
                  {invoice.status === "paid" ? "Paid" : "Unpaid"}
                </Badge>
              </td>

              {/* ✅ Dropdown Action Menu */}
              <td className="px-4 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-slate-700"
                    >
                      <Ellipsis size={18} className="text-slate-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                      onClick={() => onToggleStatus(invoice.id)}
                      className="text-sm cursor-pointer"
                    >
                      {invoice.status === "paid"
                        ? "Mark as Unpaid"
                        : "Mark as Paid"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit(invoice)}
                      className="text-sm cursor-pointer"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(invoice.id)}
                      className="text-sm text-red-500 cursor-pointer"
                    >
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
  );
}
