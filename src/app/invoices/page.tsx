"use client";

import { useEffect, useState } from "react";
import { invoiceService } from "@/lib/auth-service";
import type { Invoice } from "@/lib/types";
import InvoiceManager from "@/components/dashboard/invoice-manager";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await invoiceService.getAllInvoices();
      setInvoices(data);
    } catch (err) {
      console.error("Failed to fetch invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <InvoiceManager />
      )}
    </div>
  );
}
