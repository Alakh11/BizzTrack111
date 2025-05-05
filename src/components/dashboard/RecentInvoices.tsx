
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
import { useInvoices } from "@/hooks/useInvoices";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

const RecentInvoices = () => {
  const { invoices, isLoading } = useInvoices();
  
  // Get the 5 most recent invoices
  const recentInvoices = useMemo(() => {
    if (!invoices || invoices.length === 0) return [];
    
    return [...invoices]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  }, [invoices]);

  const formatCurrencyValue = (value: number) => {
    return formatCurrency(value);
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">Loading...</TableCell>
              </TableRow>
            ) : recentInvoices.length > 0 ? (
              recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Link
                      to={`/invoices/edit/${invoice.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {invoice.invoice_number}
                    </Link>
                  </TableCell>
                  <TableCell>{invoice.client?.name || "N/A"}</TableCell>
                  <TableCell>
                    {invoice.invoice_date && format(new Date(invoice.invoice_date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(invoice.status)}`}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyValue(Number(invoice.total_amount))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">No recent invoices found</TableCell>
              </TableRow>
            )}
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
