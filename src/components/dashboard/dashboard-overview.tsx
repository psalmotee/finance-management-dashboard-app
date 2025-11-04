"use client";

import { useEffect, useState } from "react";
import FinancialChart from "@/components/dashboard/financial-chart";
import RecentInvoices from "@/components/dashboard/recent-invoices";
import { Wallet, WalletMinimal } from "lucide-react";
import type { Invoice } from "@/lib/types";
import { client, databases } from "@/lib/appwrite";
import { Query } from "appwrite";

interface DashboardOverviewProps {
  currentUser: string;
}

export function DashboardOverview({ currentUser }: DashboardOverviewProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  //  Fetch initial invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID!,
          [Query.equal("userId", currentUser)]
        );

        const fetched = res.documents.map((doc: any) => ({
          id: doc.$id,
          clientName: doc.clientName,
          status: doc.status,
          amount: Number(doc.amount),
          vatAmount: Number(doc.vatAmount) || 0,
          dueDate: doc.dueDate,
        }));

        setInvoices(fetched);
      } catch (err) {
        console.error("Failed to load invoices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();

    const subscription = client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_APPWRITE_DB_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID}.documents`,
      (response) => {
        if (!response.events) return;

        const { events, payload } = response;

        setInvoices((prev) => {
          // Handle create
          if (events.some((e) => e.includes("create"))) {
            return [
              ...prev,
              {
                id: payload.$id,
                clientName: payload.clientName,
                status: payload.status,
                amount: Number(payload.amount),
                vatAmount: Number(payload.vatAmount) || 0,
                dueDate: payload.dueDate,
              },
            ];
          }

          // Handle update
          if (events.some((e) => e.includes("update"))) {
            return prev.map((inv) =>
              inv.id === payload.$id
                ? {
                    ...inv,
                    clientName: payload.clientName,
                    status: payload.status,
                    amount: Number(payload.amount),
                    vatAmount: Number(payload.vatAmount) || 0,
                    dueDate: payload.dueDate,
                  }
                : inv
            );
          }

          // Handle delete
          if (events.some((e) => e.includes("delete"))) {
            return prev.filter((inv) => inv.id !== payload.$id);
          }

          return prev;
        });
      }
    );

    return () => {
      if (subscription) subscription();
    };
  }, [currentUser]);

  if (loading) return <p className="text-center py-8">Loading dashboard...</p>;

  const paidInvoices = invoices.filter((inv) => inv.status === "paid");
  const unpaidInvoices = invoices.filter((inv) => inv.status === "unpaid");

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalVAT = paidInvoices.reduce((sum, inv) => sum + inv.vatAmount, 0);
  const pendingAmount = unpaidInvoices.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );

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
                <p className="text-sm font-medium mb-1 text-(--text-color-2)">
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
        <div className="lg:col-span-2">
          <FinancialChart invoices={invoices} />
        </div>

        {/* Recent Invoices */}
        <div className="lg:col-span-1">
          <RecentInvoices invoices={invoices} />
        </div>
      </div>
    </div>
  );
}
