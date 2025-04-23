
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  invoiceNumber: string;
  client: string;
  amount: number;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
}

const InvoicesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      client: "Acme Inc",
      amount: 3200,
      date: "Apr 15, 2024",
      dueDate: "Apr 30, 2024",
      status: { status: "paid", label: "Paid" },
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      client: "TechGiant Co",
      amount: 1800,
      date: "Apr 12, 2024",
      dueDate: "Apr 27, 2024",
      status: { status: "pending", label: "Pending" },
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      client: "Globe Media",
      amount: 2100,
      date: "Apr 10, 2024",
      dueDate: "Apr 25, 2024",
      status: { status: "paid", label: "Paid" },
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      client: "Bright Solutions",
      amount: 950,
      date: "Apr 05, 2024",
      dueDate: "Apr 20, 2024",
      status: { status: "overdue", label: "Overdue" },
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-005",
      client: "Nova Systems",
      amount: 2700,
      date: "Apr 01, 2024",
      dueDate: "Apr 16, 2024",
      status: { status: "paid", label: "Paid" },
    },
    {
      id: "6",
      invoiceNumber: "INV-2024-006",
      client: "Quantum Research",
      amount: 4500,
      date: "Mar 28, 2024",
      dueDate: "Apr 12, 2024",
      status: { status: "paid", label: "Paid" },
    },
    {
      id: "7",
      invoiceNumber: "INV-2024-007",
      client: "Sunrise Media",
      amount: 1350,
      date: "Mar 25, 2024",
      dueDate: "Apr 09, 2024",
      status: { status: "pending", label: "Pending" },
    },
    {
      id: "8",
      invoiceNumber: "INV-2024-008",
      client: "Blue Ocean Inc",
      amount: 2900,
      date: "Mar 22, 2024",
      dueDate: "Apr 06, 2024",
      status: { status: "overdue", label: "Overdue" },
    },
    {
      id: "9",
      invoiceNumber: "INV-2024-009",
      client: "Green Planet Solutions",
      amount: 1700,
      date: "Mar 18, 2024",
      dueDate: "Apr 02, 2024",
      status: { status: "paid", label: "Paid" },
    },
    {
      id: "10",
      invoiceNumber: "INV-2024-010",
      client: "Silver Technologies",
      amount: 3800,
      date: "Mar 15, 2024",
      dueDate: "Mar 30, 2024",
      status: { status: "paid", label: "Paid" },
    },
    {
      id: "11",
      invoiceNumber: "INV-2024-011",
      client: "Golden Star Media",
      amount: 2250,
      date: "Mar 12, 2024",
      dueDate: "Mar 27, 2024",
      status: { status: "overdue", label: "Overdue" },
    },
    {
      id: "12",
      invoiceNumber: "INV-2024-012",
      client: "Red Brick Consulting",
      amount: 5600,
      date: "Mar 08, 2024",
      dueDate: "Mar 23, 2024",
      status: { status: "paid", label: "Paid" },
    },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
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
                        {invoice.invoiceNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
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
