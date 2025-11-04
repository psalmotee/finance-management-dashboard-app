"use client";

import { useEffect, useState } from "react";
import  FinancialChart  from "@/components/dashboard/financial-chart";
import  RecentInvoices  from "@/components/dashboard/recent-invoices";
import { Wallet, WalletMinimal } from "lucide-react";
import type { Invoice } from "@/lib/types";

interface DashboardOverviewProps {
  currentUser: string;
}

export function DashboardOverview({ currentUser }: DashboardOverviewProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`invoices_${currentUser}`);
    if (stored) {
      setInvoices(JSON.parse(stored));
    }
  }, [currentUser]);

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((inv) => inv.status === "paid");
  const unpaidInvoices = invoices.filter((inv) => inv.status === "unpaid");

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalVAT = paidInvoices.reduce((sum, inv) => sum + inv.vatAmount, 0);
  const pendingAmount = unpaidInvoices.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );

  const today = new Date();
  const upcomingDue = unpaidInvoices.filter((inv) => {
    const dueDate = new Date(inv.dueDate);
    return (
      dueDate > today &&
      dueDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
  });

  const overdue = unpaidInvoices.filter((inv) => {
    const dueDate = new Date(inv.dueDate);
    return dueDate < today;
  });

  const metrics = [
    {
      title: "Total Income",
      value: `₦${totalAmount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      })}`,
      icon: Wallet,
      isDark: true,
    },
    {
      title: "Amount Paid",
      value: `₦${totalPaid.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      })}`,
      icon: Wallet,
      isDark: false,
    },
    {
      title: "Pending Payments",
      value: `₦${pendingAmount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      })}`,
      icon: WalletMinimal,
      isDark: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all hover:shadow-lg ${
                metric.isDark ? "bg-(--key-dark)" : "bg-(--gray-2)"
              }`}
            >
              <div
                className={`p-3 rounded-full ${
                  metric.isDark
                    ? "bg-(--dark-2) text-(--primary-color)"
                    : "bg-(--gray-5) text-(--key-dark)"
                }`}
              >
                <Icon size={16} />
              </div>
              <div>
                <p
                  className={`text-sm font-medium mb-1 ${
                    metric.isDark
                      ? "text-(--text-color-2)"
                      : "text-(--text-color-2)"
                  }`}
                >
                  {metric.title}
                </p>
                <h3
                  className={`text-[25px] font-bold ${
                    metric.isDark
                      ? "text-(--text-white)"
                      : "text-(--text-color-1)"
                  }`}
                >
                  {metric.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-12">
        {/* Working Capital Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <FinancialChart invoices={invoices} />
        </div>

        {/* Recent Invoices - Takes 1 column on large screens */}
        <div className="lg:col-span-1">
          <RecentInvoices invoices={invoices} />
        </div>
      </div>
    </div>
  );
}
