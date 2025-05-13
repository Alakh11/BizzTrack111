
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatDate(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "paid":
      return "text-green-600 bg-green-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "overdue":
      return "text-red-600 bg-red-100";
    case "draft":
      return "text-gray-600 bg-gray-100";
    case "sent":
      return "text-blue-600 bg-blue-100";
    default:
      return "text-blue-600 bg-blue-100";
  }
}

// Auto-generate invoice number with prefix
export function generateInvoiceNumber(
  prefix = "INV",
  existingInvoices: any[] = [],
) {
  // Get current year
  const year = new Date().getFullYear().toString();

  // Find highest invoice number with same prefix and year
  let highestNumber = 0;
  const regex = new RegExp(`^${prefix}-${year}-(\\d+)$`);

  existingInvoices.forEach((invoice) => {
    const match = invoice.invoice_number?.match(regex);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > highestNumber) highestNumber = num;
    }
  });

  // Create new invoice number with incremented sequence
  const nextNumber = (highestNumber + 1).toString().padStart(4, "0");
  return `${prefix}-${year}-${nextNumber}`;
}

// Calculate due date from invoice date
export function calculateDueDate(invoiceDate: string, daysUntilDue = 14) {
  const date = new Date(invoiceDate);
  date.setDate(date.getDate() + daysUntilDue);
  return date.toISOString().split("T")[0];
}

// Add useDebounce hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
