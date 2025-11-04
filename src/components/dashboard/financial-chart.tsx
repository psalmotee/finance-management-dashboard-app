"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { databases, realtime } from "@/lib/appwrite";

interface Invoice {
  $id?: string;
  total: number;
  dueDate: string;
  updatedAt?: string;
  status: "paid" | "unpaid" | "pending";
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const incomeEntry = payload.find((p) => p.dataKey === "income");
    const value = incomeEntry ? incomeEntry.value : 0;
    const formattedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
    return (
      <div className="p-2 bg-white border border-(--gray-2) rounded-md shadow-md text-xs font-medium text-gray-700">
        {formattedValue}
      </div>
    );
  }
  return null;
};

const formatYAxis = (tick: number) =>
  tick === 0 ? "0K" : `${Math.round(tick / 1000)}K`;

const formatDateKey = (dateString?: string): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const processInvoicesForChart = (invoices: Invoice[], numDays = 7) => {
  const dataMap = new Map();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates: string[] = [];

  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const formatted = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    dates.push(formatted);
    dataMap.set(formatted, { date: formatted, income: 0, expense: 0 });
  }

  invoices.forEach((inv) => {
    const amount = Number(inv.total);
    if (inv.status === "paid" && inv.updatedAt) {
      const date = formatDateKey(inv.updatedAt);
      if (date && dataMap.has(date)) dataMap.get(date).income += amount;
    } else if (inv.status === "unpaid" || inv.status === "pending") {
      const date = formatDateKey(inv.dueDate);
      if (date && dataMap.has(date)) dataMap.get(date).expense += amount;
    }
  });

  return dates.map((d) => dataMap.get(d));
};

export default function FinancialChart() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const INCOME_COLOR = "var(--secondary-color)";
  const EXPENSE_COLOR = "var(--primary-color)";
  const DOT_COLOR = "var(--tertiary-color)";
  const HIGHLIGHT = "var(--gray-5)";
  const TEXT = "var(--text-color-2)";
  const BORDER = "var(--gray-2)";

  // 🔄 Load invoices and realtime subscription
  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID!
        );
        setInvoices(response.documents as unknown as Invoice[]);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();

    // Realtime updates
    const unsubscribe = realtime.subscribe(
      `databases.${process.env.NEXT_PUBLIC_APPWRITE_DB_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID}.documents`,
      (event) => {
        if (event.events.some((e) => e.includes("create"))) {
          setInvoices((prev) => [...prev, event.payload as Invoice]);
        } else if (event.events.some((e) => e.includes("delete"))) {
          setInvoices((prev) =>
            prev.filter((i) => i.$id !== event.payload.$id)
          );
        } else if (event.events.some((e) => e.includes("update"))) {
          setInvoices((prev) =>
            prev.map((i) =>
              i.$id === event.payload.$id ? (event.payload as Invoice) : i
            )
          );
        }
      }
    );

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      } else if (
        unsubscribe &&
        typeof (unsubscribe as any).unsubscribe === "function"
      ) {
        (unsubscribe as any).unsubscribe();
      }
    };
  }, []);

  // 🔢 Memoized chart data
  const chartData = useMemo(
    () => processInvoicesForChart(invoices, 7),
    [invoices]
  );

  // 🧮 Dynamic Y-axis range
  const maxTotal = useMemo(() => {
    let max = 10000;
    chartData.forEach((d) => {
      max = Math.max(max, d.income, d.expense);
    });
    return Math.ceil((max * 1.1) / 5000) * 5000;
  }, [chartData]);

  // 🧠 Key trick: force LineChart re-render on data change
  const chartKey = useMemo(() => JSON.stringify(chartData), [chartData]);

  if (loading)
    return (
      <p className="text-center py-10 text-(gray-2">
        Loading financial data...
      </p>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="pb-4 flex items-center justify-around">
        <h3 className="text-lg font-semibold text-(--text-color-1)">
          Working Capital
        </h3>
        <div className="flex items-center justify-around gap-30">
          <div className="flex items-center gap-4 text-xs text-(--text-color-1)">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-(--secondary-color)"></span>
              Income
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-(--primary-color)"></span>
              Expenses
            </span>
          </div>
          <Button className="h-10 rounded-lg border-none bg-(--gray-2) text-(--text-color-1) hover:bg-(--gray-5) text-xs">
            Last 7 days <ChevronDown size={14} className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            key={chartKey} // ✅ Force grid + line re-render on update
            data={chartData}
            margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
            onMouseMove={(state) =>
              state.isTooltipActive
                ? setActiveLabel(state.activeLabel)
                : setActiveLabel(null)
            }
          >
            {activeLabel && (
              <ReferenceArea
                x1={activeLabel}
                x2={activeLabel}
                fill={HIGHLIGHT}
              />
            )}
            {/* ✅ Grid updates dynamically now */}
            <CartesianGrid vertical stroke={BORDER} key={maxTotal} />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: TEXT, fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: TEXT, fontSize: 12 }}
              tickFormatter={formatYAxis}
              domain={[0, maxTotal]}
            />
            <Tooltip cursor={false} content={<CustomTooltip />} />

            <Line
              type="natural"
              dataKey="income"
              stroke={INCOME_COLOR}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: DOT_COLOR }}
            />
            <Line
              type="natural"
              dataKey="expense"
              stroke={EXPENSE_COLOR}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: DOT_COLOR }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
