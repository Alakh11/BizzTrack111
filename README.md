# BizzTrack - Financial Management System

## Quick Start

## How can I edit this code?

There are several ways of editing your application.


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/Alakh11/BizzTrack11.git

# Step 2: Navigate to the project directory.
cd BizzTrack11

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.


## Overview

BizzTrack is a comprehensive financial management system designed for small businesses, freelancers, and entrepreneurs. The application provides tools for invoicing, expense tracking, client management, and financial reporting in a user-friendly interface.

## Key Features

- **Invoice Management**: Create, customize, and track professional invoices
- **Expense Tracking**: Log and categorize business expenses
- **Client Management**: Maintain a database of clients and their information
- **Products & Services**: Catalog items for quick addition to invoices
- **Financial Reporting**: Visualize financial data and trends

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth
- **State Management**: React Query, React Context
- **Charts**: Recharts

## Project Structure

```
invoice-flow/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # Third-party integrations
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── types/          # TypeScript type definitions
└── supabase/           # Supabase configuration and functions
```

## Detailed Documentation

For a comprehensive project overview, architecture details, and feature documentation, please refer to the [PROJECT_REPORT.md](./PROJECT_REPORT.md) file.

## 📦 Supabase Integration

For a Comprehensive supabase overview, authentication, user profiles, and database operations, please refer to the [SUPABASE.md](./SUPABASE.md) file.


## License

This project is licensed under the MIT License - see the LICENSE file for details.
