
# SQL Queries Used in the Project

This document outlines the key SQL queries and database operations used in the Business Management application.

## Table Creation Queries

### Profiles Table
```sql
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  avatar_url TEXT,
  business_name TEXT,
  business_address TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  website TEXT,
  gst_number TEXT,
  pincode TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Products Table
```sql
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  sku TEXT NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  low_stock_threshold INTEGER DEFAULT 10,
  description TEXT,
  barcode TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Transactions Table
```sql
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  transaction_number TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  total_amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cash',
  status TEXT NOT NULL DEFAULT 'completed',
  notes TEXT,
  customer_name TEXT,
  customer_mobile TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Transaction Items Table
```sql
CREATE TABLE public.transaction_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Customers Table
```sql
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Stored Receipts Table
```sql
CREATE TABLE public.stored_receipts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users,
  transaction_id UUID NOT NULL REFERENCES public.transactions,
  receipt_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_deleted BOOLEAN NOT NULL DEFAULT false
);
```

## Row Level Security Policies

### Products Table Policies
```sql
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own products" 
  ON public.products 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own products" 
  ON public.products 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products" 
  ON public.products 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products" 
  ON public.products 
  FOR DELETE 
  USING (auth.uid() = user_id);
```

### Transaction Table Policies
```sql
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions" 
  ON public.transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" 
  ON public.transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
```

### Common Database Operations

#### Fetch Products with Low Stock
```sql
SELECT * FROM products 
WHERE user_id = auth.uid() 
AND quantity <= COALESCE(low_stock_threshold, 10)
ORDER BY quantity ASC;
```

#### Update Product Quantity After Transaction
```sql
UPDATE products 
SET quantity = quantity - $1 
WHERE id = $2 AND user_id = auth.uid();
```

#### Get Recent Transactions
```sql
SELECT * FROM transactions
WHERE user_id = auth.uid()
ORDER BY created_at DESC
LIMIT 10;
```

#### Search for Customers
```sql
SELECT * FROM customers
WHERE user_id = auth.uid()
AND (name ILIKE '%' || $1 || '%' OR mobile ILIKE '%' || $1 || '%')
ORDER BY name;
```
