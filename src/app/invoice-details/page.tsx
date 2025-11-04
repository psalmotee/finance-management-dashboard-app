"use client";

import { useEffect, useState } from "react";
import { SidebarNavigation } from "@/components/dashboard/sidebar-nav";
import Topbar from "@/components/dashboard/topbar";
import InvoiceDetails from "@/components/dashboard/Invoice-details";
import { invoiceService } from "@/lib/auth-service";
import type { Invoice } from "@/lib/types";

interface InvoiceDetailsPageProps {
  currentUser: string;
  activeTab: string;
}

export default function InvoiceDetailsPage() {
  const [currentUser, setCurrentUser] = useState("John Doe");
  const [activeTab, setActiveTab] = useState("Invoices");
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  // Get invoice ID from query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      invoiceService
        .getInvoiceById(id)
        .then((inv) => {
          setInvoice(inv);
          setActiveTab(`New Invoice: ${inv.id}`);
        })
        .catch(console.error);
    }
  }, []);

  const handleLogout = () => console.log("Logout clicked");

  return (
    <div className="flex h-screen">
      <SidebarNavigation
        currentUser={currentUser}
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-auto">
        <Topbar currentUser={currentUser} activeTab={activeTab} />

        <main className="flex-1 overflow-auto">
          {invoice ? (
            <InvoiceDetails invoice={invoice} />
          ) : (
            <p className="text-center text-gray-500">Loading invoice...</p>
          )}
        </main>
      </div>
    </div>
  );
}
