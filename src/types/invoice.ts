
import { Json } from "@/integrations/supabase/types";

export interface Invoice {
  id: string;
  user_id: string;
  client_id: string | null;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  total_amount: number;
  status: string | null;
  notes: string | null;
  terms: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
  client?: {
    name: string;
    address?: string;
    email?: string;
    phone?: string;
  };
  invoice_items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id: string | null;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  service_id: string | null;
  created_at: string | null;
}
