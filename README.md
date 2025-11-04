# 💼 Finance Management Dashboard App

This project is a single-page Financial Management Dashboard designed for small businesses to track invoices, monitor key financial metrics, and view real-time revenue and payment status. It is built using React, styled with Tailwind CSS, and uses Recharts for data visualization, adhering to a clean, responsive design.

The app visualizes invoices, payments, and other business financial data through dynamic charts and interactive tables.

---

## Features

The dashboard provides a complete financial overview:

Dashboard Metrics: Live summary of Total Invoices, Amount Paid, and Pending Payments.

Working Capital Chart: Interactive line chart visualization (using Recharts) to track mock Income vs. Expenses over time.

Recent Invoices Table: A stylized, responsive table displaying key details for the most recent invoices, including client, date, amount, and payment status.

Responsive Design: Fully optimized for both desktop and mobile viewing.

Modern UI: Built using Tailwind CSS and ShadCN/UI inspired components.

## Tech Stack

Frontend Framework: React

Styling: Tailwind CSS

UI Components: ShadCN/UI (simulated within the single file)

Data Visualization: Recharts

Icons: Lucide React

Data Source Appwrite SDK

---

## Environment Variables

Create a `.env.local` file in your project root and add the following:


NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_DB_ID=your-database-id
NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID=your-collection-id
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=Finance Management Dashboard

Local Development

Clone the repository

git clone https://github.com/yourusername/finance-management-dashboard-app.git
cd finance-management-dashboard-app


Install dependencies

npm install


Run the development server

npm run dev


Open http://localhost:3000
 to see your app.

Build for Production
npm run build
npm start

src/
├── app/                        # Next.js App Router
│   ├── dashboard/              # Dashboard page
│   │   └── page.tsx
│   ├── invoice-details/        # Invoice details page
│   │   └── page.tsx
│   ├── invoices/               # All invoices list
│   │   └── page.tsx
│   ├── login/                  # Login page
│   ├── signup/                 # Signup page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global Tailwind styles
│   └── page.tsx                # Home page
│
├── components/
│   ├── auth/                   # Authentication forms
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── dashboard/              # Dashboard UI logic
│   │   ├── dashboard-overview.tsx
│   │   ├── dashboard.tsx
│   │   ├── financial-chart.tsx
│   │   ├── invoice-form.tsx
│   │   ├── invoice-manager.tsx
│   │   ├── invoice-table.tsx
│   │   ├── recent-invoices.tsx
│   │   ├── sidebar-nav.tsx
│   │   ├── topbar.tsx
│   │   └── delete-confirmation.tsx
│   ├── ui/                     # Shared UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── theme-toggle.tsx
│
├── hooks/                      # Reusable hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/                        # Utility and services
│   ├── appwrite.ts             # Appwrite client setup
│   ├── auth-service.ts         # Appwrite service logic
│   ├── types.ts                # Shared types
│   └── utils.ts                # Helpers
│
├── styles/                     # Tailwind and CSS configs
├── public/                     # Static files (assets, icons, images)
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
└── next.config.ts              # Next.js config
