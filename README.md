
# Invoice Flow - Invoicing & Finance Management System

## Overview

Invoice Flow is a comprehensive invoicing and financial management application designed for small businesses, freelancers, and entrepreneurs. It simplifies the process of creating, tracking, and managing invoices, along with expense tracking, client management, and comprehensive financial reporting.

## Key Features

### Invoice Management
- Create professional invoices with customizable templates
- Track invoice status (pending, paid, overdue)
- Send invoices directly to clients via email
- Schedule recurring invoices
- Include GST/tax details with proper compliance
- Support for shipping and transportation details

### Client Management
- Maintain a database of clients
- Store client contact information and billing details
- Track client payment history
- Manage client-specific pricing

### Products & Services
- Catalog of products and services
- Track inventory for physical products
- Set prices and descriptions
- Quickly add items to invoices

### Expense Tracking
- Log business expenses by category
- Upload receipt images
- Generate expense reports
- Track expense status (pending, reimbursed)

### Financial Reporting
- Dashboard with key financial metrics
- Revenue trends and forecasts
- Expense analysis by category
- Client payment statistics
- Tax liability calculations
- Export reports to PDF/CSV

### User & Business Settings
- Configure business details for invoices
- Customize payment terms
- Set default tax rates
- Manage bank account information
- Personalize invoice templates

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth
- **State Management**: React Query
- **Routing**: React Router
- **Charts & Visualizations**: Recharts
- **PDF Generation**: Custom rendering

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn package manager

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/invoice-flow.git
cd invoice-flow
```

2. Install dependencies:
```
npm install
# or
yarn install
```

3. Set up environment variables:
Create a .env file in the root directory with the following:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```
npm run dev
# or
yarn dev
```

## Deployment

The application can be deployed to any static hosting service such as Vercel, Netlify, or GitHub Pages.

## Project Structure

```
invoice-flow/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── clients/    # Client management components
│   │   ├── expenses/   # Expense tracking components
│   │   ├── invoices/   # Invoice management components
│   │   ├── layout/     # Layout components (header, sidebar, etc.)
│   │   ├── products/   # Product management components
│   │   ├── services/   # Service management components
│   │   └── ui/         # Core UI components (shadcn/ui)
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # Integration with third-party services
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Main app component
└── ...                 # Configuration files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
