
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ChartCard from "./ChartCard";
import { Link } from "react-router-dom";

interface InvoiceStatus {
  status: "paid" | "pending" | "overdue";
  label: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
}

const RecentInvoices = () => {
  const invoices = useMemo(
    () => [
      {
        id: "1",
        invoiceNumber: "INV-2024-001",
        client: "Acme Inc",
        amount: 3200,
        date: "Apr 15, 2024",
        status: { status: "paid", label: "Paid" },
      },
      {
        id: "2",
        invoiceNumber: "INV-2024-002",
        client: "TechGiant Co",
        amount: 1800,
        date: "Apr 12, 2024",
        status: { status: "pending", label: "Pending" },
      },
      {
        id: "3",
        invoiceNumber: "INV-2024-003",
        client: "Globe Media",
        amount: 2100,
        date: "Apr 10, 2024",
        status: { status: "paid", label: "Paid" },
      },
      {
        id: "4",
        invoiceNumber: "INV-2024-004",
        client: "Bright Solutions",
        amount: 950,
        date: "Apr 05, 2024",
        status: { status: "overdue", label: "Overdue" },
      },
      {
        id: "5",
        invoiceNumber: "INV-2024-005",
        client: "Nova Systems",
        amount: 2700,
        date: "Apr 01, 2024",
        status: { status: "paid", label: "Paid" },
      },
    ] as Invoice[],
    []
  );

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success-light text-success border-success";
      case "pending":
        return "bg-warning-light text-warning border-warning";
      case "overdue":
        return "bg-error-light text-error border-error";
      default:
        return "bg-info-light text-info border-info";
    }
  };

  return (
    <ChartCard title="Recent Invoices">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Link
                    to={`/invoices/${invoice.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {invoice.invoiceNumber}
                  </Link>
                </TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(
                      invoice.status.status
                    )} border`}
                  >
                    {invoice.status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(invoice.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 text-center">
        <Link
          to="/invoices"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all invoices
        </Link>
      </div>
    </ChartCard>
  );
};

export default RecentInvoices;
