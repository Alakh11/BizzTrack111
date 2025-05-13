
# Supabase Integration in the Business Management App

## Overview
This project uses Supabase as its backend service provider, handling data storage, authentication, and server-side functions. Supabase is an open-source Firebase alternative built on top of PostgreSQL.

## Features Used

### 1. Authentication
- Email/password authentication for user signup and login
- Password reset functionality
- Session management
- User profile storage

### 2. Database Tables
The following database tables are managed through Supabase:

- `profiles`: Stores user profile information including name, business details, and contact information
- `products`: Manages inventory items with fields for name, SKU, price, quantity, and category
- `transactions`: Records sales transactions with payment information and status
- `transaction_items`: Stores line items for each transaction
- `customers`: Stores customer information including name, contact details, and address
- `stored_receipts`: Maintains a record of transaction receipts for later reference
- `expenses`: Tracks business expenses by category
- `services`: Stores service offerings with pricing
- `invoices`: Manages customer invoices
- `invoice_items`: Tracks individual line items for invoices
- `clients`: Stores client information for invoicing

### 3. Row Level Security (RLS)
Supabase RLS policies are implemented for each table to ensure users can only access their own data, providing security at the database level.

### 4. Real-time Updates
The application uses Supabase's real-time subscription features to keep data synchronized across different devices and users.

### 5. Storage
Supabase Storage is used for:
- Profile pictures
- Product images
- Business documents

## Integration Points
- The main Supabase client is initialized in `src/integrations/supabase/client.ts`
- Authentication hooks in `src/hooks/useAuth.tsx` manage user login, signup, and session state
- Custom hooks for each entity type (products, transactions, invoices, etc.) handle CRUD operations against the Supabase backend

## Configuration
The Supabase connection is configured using environment variables:
- `SUPABASE_URL`: The URL of the Supabase project
- `SUPABASE_PUBLISHABLE_KEY`: The public API key for authentication from the browser
