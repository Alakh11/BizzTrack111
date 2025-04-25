
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

interface Invoice {
  id: string;
  invoice_number: string;
  client: { name: string };
  total_amount: number;
  invoice_date: string;
  status: string;
}

const RecentInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecentInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*, client:client_id(name)')
        .order('invoice_date', { ascending: false })
        .limit(5);

      if (error) throw error;
      
      setInvoices(data || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching recent invoices:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentInvoices();

    // Set up real-time listener
    const channel = supabase
      .channel('recent-invoices-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'invoices' 
      }, () => {
        fetchRecentInvoices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        {isLoading ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Loading invoices...</p>
          </div>
        ) : invoices.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">No invoices found</p>
          </div>
        ) : (
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
                      {invoice.invoice_number}
                    </Link>
                  </TableCell>
                  <TableCell>{invoice.client?.name || 'Unknown Client'}</TableCell>
                  <TableCell>{formatDate(invoice.invoice_date)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(invoice.status)} border`}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(invoice.total_amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
