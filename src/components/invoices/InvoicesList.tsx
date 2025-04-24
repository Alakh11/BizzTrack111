import { useState } from "react";
import { Link } from "react-router-dom";
import { useInvoices } from "@/hooks/useInvoices";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, ChevronLeft, ChevronRight, FileText, Download, Trash } from "lucide-react";

interface InvoiceStatus {
  status: "paid" | "pending" | "overdue";
  label: string;
}

interface Invoice {
  id: string;
  invoice_number: string;
  client: { name: string };
  amount: number;
  date: string;
  due_date: string;
  status: InvoiceStatus;
}

const InvoicesList = () => {
  const { invoices, isLoading } = useInvoices();
  
  useEffect(() => {
    const channel = supabase
      .channel('public:invoices')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'invoices' },
        (payload) => {
          console.log('Change received!', payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredInvoices = invoices?.filter(
    (invoice) =>
      invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client?.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + itemsPerPage
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
    <div className="space-y-4">
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
            className="pl-10 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            All Invoices
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <FileText className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {invoice.invoice_number}
                      </Link>
                    </TableCell>
                    <TableCell>{invoice.client.name}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.due_date}</TableCell>
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
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              to={`/invoices/${invoice.id}`}
                              className="flex items-center w-full"
                            >
                              <FileText className="h-4 w-4 mr-2" /> View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No invoices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredInvoices.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredInvoices.length)} of{" "}
              {filteredInvoices.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicesList;
