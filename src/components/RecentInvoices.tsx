
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
}

const RecentInvoices: React.FC = () => {
  // Sample invoices data
  const invoices: Invoice[] = [
    { id: "1", invoiceNumber: "INV-001", client: "Acme Inc.", amount: 1200, date: "2024-04-10", status: "paid" },
    { id: "2", invoiceNumber: "INV-002", client: "TechGiant", amount: 3500, date: "2024-04-15", status: "pending" },
    { id: "3", invoiceNumber: "INV-003", client: "GlobalMedia", amount: 800, date: "2024-04-02", status: "overdue" },
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Invoices</h3>
        <a href="/invoices" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>${invoice.amount}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    invoice.status === "paid"
                      ? "success"
                      : invoice.status === "pending"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {invoice.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentInvoices;
