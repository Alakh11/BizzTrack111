
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Add formatDate function
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
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
