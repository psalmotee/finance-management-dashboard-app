"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface FinancialChartProps {
  invoices: Invoice[];
}

export function FinancialChart({ invoices }: FinancialChartProps) {
  const dailyData = invoices.reduce((acc, inv) => {
    const date = new Date(inv.dueDate).toLocaleDateString("en-NG", {
      month: "short",
      day: "numeric",
    });
    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.income += inv.status === "paid" ? inv.amount : 0;
      existing.expense += inv.status === "unpaid" ? inv.amount : 0;
    } else {
      acc.push({
        date,
        income: inv.status === "paid" ? inv.amount : 0,
        expense: inv.status === "unpaid" ? inv.amount : 0,
      });
    }
    return acc;
  }, [] as Array<{ date: string; income: number; expense: number }>);

  return (
    <div className="p-6 border border-(--gray-2) rounded-md">
      {/* Header */}
      <div className="pb-4 flex items-center justify-center">
        <div className="flex items-center justify-center w-full space-x-50">
          <h3 className="text-lg font-semibold text-(--text-color-1)">
            Working Capital
          </h3>

          <div className="flex items-center gap-20">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs text-(--text-color-1)">
                <span className="w-2 h-2 rounded-full bg-(--secondary-color)"></span>
                Income
              </span>
              <span className="flex items-center gap-1 text-xs text-(--text-color-1)">
                <span className="w-2 h-2 rounded-full bg-(--primary-color)"></span>
                Expenses
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-none bg-(--gray-2) text-(--text-color-1) hover:bg-(--gray-5) text-xs"
            >
              Last 7 days
              <ChevronDown size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        {dailyData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%" >
            <LineChart
              data={dailyData}
              margin={{ top: 15, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                horizontal={false}
                strokeDasharray="3 3"
                stroke="var(--gray-2)"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--text-color-2)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--text-color-2)", fontSize: 12 }}
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--gray-2)",
                  border: "none",
                  borderRadius: "8px",
                  // boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
                labelStyle={{
                  display: "none",
                }}
                itemStyle={{
                  color: "var(--text-color-2)",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="var(--secondary-color)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "var(--tertiary-color)", strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="var(--primary-color)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "var(--tertiary-color)", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-(--text-color-1)">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}
