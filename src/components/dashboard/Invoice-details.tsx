"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Eye, Download, BadgeCheck, Ellipsis } from "lucide-react"; // Icons based on the image
import Image from "next/image";
import LogoSale from "@/assets/images/logo-sale.png";
import ClientPic from "@/assets/images/client1.png";
import type { Invoice, InvoiceItem } from "@/lib/types";

interface InvoiceDetailsProps {
  invoice: Invoice;
}

// Dummy data structure for the item rows to match the screenshot
// Replace with actual data mapping from your 'invoice' object if needed.
const dummyInvoiceItems: InvoiceItem[] = [
  {
    id: 1,
    item: "iPhone 13 Pro Max",
    orderType: "01",
    rate: 544,
    amount: 544.0,
  },
  {
    id: 2,
    item: "Netflix Subscription",
    orderType: "01",
    rate: 420,
    amount: 420.0,
  },
];

export default function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  if (!invoice) return null;

  // Static/dummy values from the screenshot for a perfect visual match
  const invoiceNumber = "MAG 254420";
  const issuedDate = "10 Apr 2022";
  const dueDate = "20 Apr 2022";
  const clientName = "Sajib Rahman";
  const clientEmail = "rahman.sajib@uihut.com";
  const clientAgency = "UIHUT Agency LTD";
  const clientAddress = "3471 Rainy Day Drive, Tulsa, USA";
  const magloAddress1 = "1333 Grey Fox Farm Road";
  const magloAddress2 = "Houston, TX 77060";
  const magloAddress3 = "Bloomfield Hills, Michigan(MI), 48301";
  const subtotal = 964.0; // 544.00 + 420.00
  const total = 964.0;
  const invoiceDate = "14 Apr 2022"; // From Basic Info

  // The main layout is a flex container with two primary columns
  return (
    <Card className="bg-(--gray-1) shadow-none border-none">
      <div className="flex-1 p-8 space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
        {/* --- Left Column: Invoice Content --- */}
        <div className="flex-2/3 space-y-6 min-w-0 bg-white">
          {/* Maglo Details Card */}
          <Card className="bg-(--key-dark)  rounded-2xl">
            <CardContent className="text-white flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <Image
                  src={LogoSale}
                  alt="Maglo Logo"
                  width={170}
                  height={170}
                  className="rounded-sm"
                />
              </div>
              <div className="text-right text-sm space-y-1">
                <p>{magloAddress1}</p>
                <p>{magloAddress2}</p>
                <p>{magloAddress3}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-(--gray-2) rounded-2xl">
            <CardContent className="grid grid-cols-2 gap-y-4 text-sm">
              {/* Invoice Info Section */}
              <div>
                <h3 className="text-lg font-semibold text-(--text-color-1) mb-4">
                  Invoice Number
                </h3>
                <p className="text-sm text-(--text-color-2)">{invoiceNumber}</p>

                <p className="text-sm font-medium text-(--text-color-2) mt-2">
                  Issued Date: <span>{issuedDate}</span>
                </p>

                <p className="text-sm font-medium text-(--text-color-2) mt-2">
                  Due Date: <span>{dueDate}</span>
                </p>
              </div>

              <div className="text-right">
                {/* Header: Billed to */}
                <h3 className="text-lg font-semibold text-(--text-color-1) mb-4">
                  Billed to
                </h3>
                <p className="text-sm text-(--text-color-2) ">{clientName}</p>
                <p className="text-sm text-(--text-color-2) mt-2">
                  {clientAddress.split(", ")[0]}
                </p>
                <p className="text-sm text-(--text-color-2) mt-2">
                  {clientAddress.split(", ")[1]}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Item Details Section */}
          <Card className=" border-none">
            <div>
              <h3 className="text-[16px] font-bold text-(--text-color-1) mb-1">
                Item Details
              </h3>
              <p className="text-sm text-(--text-color-2)">
                Details item with more info
              </p>
            </div>
            {/* Item Table Header */}
            <table className="w-full table-auto">
              <thead>
                <tr className="">
                  <th className="text-left text-sm font-semibold text-(--text-color-2) w-1/2">
                    ITEM
                  </th>
                  <th className="text-left text-sm font-semibold text-(--text-color-2) w-1/6">
                    ORDER/TYPE
                  </th>
                  <th className="text-right text-sm font-semibold text-(--text-color-2) w-1/6">
                    RATE
                  </th>
                  <th className="text-right text-sm font-semibold text-(--text-color-2) w-1/6">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {dummyInvoiceItems.map((item) => (
                  <tr key={item.id} className="h-16 align-middle">
                    <td className="pr-2">
                      <div className="border border-(--gray-3) rounded-lg p-3 h-full flex items-center text-left text-sm font-semibold text-gray-700">
                        {item.item}
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="border border-(--gray-3) rounded-lg p-3 h-full flex items-center text-left text-sm font-medium text-gray-700">
                        {item.orderType}
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="border border-(--gray-3) rounded-lg p-3 h-full flex items-center text-right text-sm font-medium text-gray-700 justify-end">
                        ${item.rate.toFixed(2)}
                      </div>
                    </td>
                    <td className="pl-2">
                      <div className="border border-(--gray-3) rounded-lg p-3 h-full flex items-center text-right text-sm font-medium text-gray-700 justify-end">
                        ${item.amount.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add Item Button */}
            <div className="flex justify-between">
              {/* Use flex to position Add Item and Totals */}
              <Button
                variant="ghost"
                className="text-green-600 hover:text-green-700 px-0"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
              {/* Totals Section */}
              <div className="w-full max-w-xs space-y-4">
                {/* Max-width and spacing for the totals block */}
                <div className="flex justify-between text-sm font-medium">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Discount</span>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-(--secondary-color) hover:text-(--secondary-color)/80"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Tax</span>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-(--secondary-color) hover:text-(--secondary-color)/80"
                  >
                    Add
                  </Button>
                </div>
                {/* Divider Line */}
                <hr className="border-t border-gray-200 my-2" />
                <div className="flex justify-between text-sm font-semibold pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* --- Right Column: Client & Basic Info --- */}
        <div className="flex-1/3 px-8 space-y-6 bg-(--gray-4)">
          {/* Client Details Card */}
          <Card className="p-6 shadow-md border border-(--gray-3) rounded-2xl">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-bold">
                Client Details
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0 flex items-center justify-center text-(--gray-5) hover:text-(--text-color-1)"
              >
                <Ellipsis className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-neutral flex items-center justify-center overflow-hidden">
                <Image
                  src={ClientPic}
                  alt={clientName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{clientName}</p>
                <p className="text-md text-gray-500">{clientEmail}</p>
              </div>
            </div>
            <p className="text-md font-semibold flex items-center">
              {clientAgency}{" "}
              <span>
                <BadgeCheck
                  size={16}
                  color="var(--badge-color)"
                  strokeWidth={1}
                  absoluteStrokeWidth
                />
              </span>
            </p>
            <p className="text-md text-(--text-color-1)">{clientAddress}</p>
            <Button className="py-6 w-full bg-(--secondary-light-color) text-(--secondary-color) hover:bg-(--secondary-color)/10 rounded-lg font-semibold">
              Add Customer
            </Button>
          </Card>

          {/* Basic Info Card */}
          <Card className="p-6 shadow-md border space-y- border-(--gray-3) rounded-2xl">
            <CardTitle className="text-lg font-semibold">
              Basic Info
            </CardTitle>

            <div className="space-y-4">
              <p className="text-sm text-gray-500">Invoice Date</p>
              <div className="flex justify-between items-center border p-3 rounded-lg">
                <p className="text-sm font-medium">{invoiceDate}</p>
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">Due Date</p>
              <div className="flex justify-between items-center border p-3 rounded-lg">
                <p className="text-sm font-medium">{dueDate}</p>
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <Button className="w-full py-6 rounded-lg bg-(--primary-color) hover:bg(--primary-color/10) text-(--text-color-1) font-semibold">
              Send Invoice
            </Button>

            <div className="flex justify-between space-x-4">
              <Button className="py-6 w-1/2 border border-(--gray-3) text-(--secondary-color) bg-(--gray-2) hover:bg(--gray-5) flex items-center">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </Button>
              <Button className="py-6 w-1/2 border border-(--gray-3) text-(--secondary-color) bg-(--gray-2) hover:bg(--gray-5) flex items-center">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}
