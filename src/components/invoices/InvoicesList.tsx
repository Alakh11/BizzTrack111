
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { MoreHorizontal, Search, ChevronLeft, ChevronRight, FileText, Download, Trash, Edit, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvoiceStatus {
  status: "paid" | "pending" | "overdue";
  label: string;
}

interface Invoice {
  id: string;
  invoice_number: string;
  client: { name: string };
  invoice_date: string;
  due_date: string;
  status: string;
  total_amount: number;
}

const InvoicesList = () => {
  const { invoices: apiInvoices, isLoading } = useInvoices();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sample invoices to display regardless of API response
  const sampleInvoices = [
    {
      id: "inv-001",
      invoice_number: "INV-2024-001",
      client: { name: "Tech Solutions Inc." },
      invoice_date: "2024-04-01",
      due_date: "2024-04-15",
      status: "paid",
      total_amount: 85000,
    },
    {
      id: "inv-002",
      invoice_number: "INV-2024-002",
      client: { name: "Global Traders Ltd." },
      invoice_date: "2024-04-05",
      due_date: "2024-04-20",
      status: "pending",
      total_amount: 42500,
    },
    {
      id: "inv-003",
      invoice_number: "INV-2024-003",
      client: { name: "Innovate Systems" },
      invoice_date: "2024-04-10",
      due_date: "2024-04-25",
      status: "paid",
      total_amount: 63750,
    },
    {
      id: "inv-004",
      invoice_number: "INV-2024-004",
      client: { name: "Reliable Services" },
      invoice_date: "2024-04-12",
      due_date: "2024-04-27",
      status: "overdue",
      total_amount: 25000,
    },
    {
      id: "inv-005",
      invoice_number: "INV-2024-005",
      client: { name: "Premier Corp." },
      invoice_date: "2024-04-15",
      due_date: "2024-04-30",
      status: "pending",
      total_amount: 37500,
    },
  ];
  
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

  // Combine API invoices with sample invoices if API invoices exist
  const allInvoices = apiInvoices?.length ? apiInvoices : sampleInvoices;

  const filteredInvoices = allInvoices.filter(
    (invoice) =>
      invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
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

  const handleDeleteInvoice = (id: string) => {
    // In a real app, this would call the API to delete the invoice
    toast({
      title: "Invoice deleted",
      description: "The invoice has been successfully deleted.",
    });
  };

  const handleEditInvoice = (id: string) => {
    navigate(`/invoices/edit/${id}`);
  };

  const handleViewInvoice = (id: string) => {
    navigate(`/invoices/${id}`);
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
                    <TableCell>{invoice.invoice_date}</TableCell>
                    <TableCell>{invoice.due_date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(invoice.status)} border`}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {invoice.total_amount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewInvoice(invoice.id)}>
                            <FileText className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditInvoice(invoice.id)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive" 
                            onClick={() => handleDeleteInvoice(invoice.id)}
                          >
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
                Page {currentPage} of {totalPages || 1}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
                }
                disabled={currentPage === (totalPages || 1)}
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
