"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Invoice } from "@/lib/types";
import { ChevronRight } from "lucide-react";

interface RecentInvoicesProps {
  invoices: Invoice[];
}

export function RecentInvoices({ invoices }: RecentInvoicesProps) {
  const recentInvoices = invoices.slice(-5).reverse();

  const getClientInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="mt-12">
      <div className="pb-4 flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-(--text-color-1)">
          Recent Invoice
        </h3>
        <Link
          href="#invoice-manager"
          className="flex items-center justify-center text-sm font-semibold text-(--secondary-color) hover:text-(--secondary-color)/80"
        >
          View All
          <ChevronRight className="ml-2" size={14} />
        </Link>
      </div>
      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
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
              {recentInvoices.length > 0 ? (
                recentInvoices.map((invoice, index) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-(--gray-3) hover:bg-(--gray-5) rounded-2xl transition-colors"
                  >
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
                        variant={
                          invoice.status === "paid" ? "default" : "secondary"
                        }
                        className={`text-xs font-medium rounded-md px-3 py-1 ${
                          invoice.status === "paid"
                            ? "bg-(--paid-bg) text-(--paid-text)"
                            : invoice.status === "pending"
                            ? "bg-(--pending-bg) text-(--pending-text)"
                            : "bg-(--unpaid-bg) text-(--unpaid-text)"
                        }`}
                      >
                        {invoice.status === "paid" ? "Paid" : invoice.status === "pending" ? "Pending" : "Unpaid"}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-0.5">
                        <p className="w-1 h-1 rounded-full bg-(--secondary-color)"></p>
                        <p className="w-1 h-1 rounded-full bg-(--secondary-color)"></p>
                        <p className="w-1 h-1 rounded-full bg-(--secondary-color)"></p>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                  >
                    No invoices yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
