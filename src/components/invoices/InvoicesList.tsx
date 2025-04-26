
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Send,
  Trash,
  IndianRupee,
} from "lucide-react";
import { useInvoices } from "@/hooks/useInvoices";

// Update the component to fetch and display invoices from the database
const InvoicesList = () => {
  const { invoices, isLoading, deleteInvoice } = useInvoices();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="w-full overflow-auto">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-white">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-medium">No invoices found</h3>
        <p className="mt-1 text-muted-foreground">
          Create your first invoice to get started.
        </p>
        <Button asChild className="mt-4">
          <Link to="/invoices/new">
            <Plus className="h-4 w-4 mr-1" /> Create Invoice
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Invoices</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.client?.name || "N/A"}</TableCell>
                <TableCell>
                  {new Date(invoice.invoice_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(invoice.due_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-1 text-muted-foreground" />
                    {invoice.total_amount.toLocaleString("en-IN")}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      invoice.status === "paid"
                        ? "secondary"
                        : invoice.status === "overdue"
                        ? "destructive"
                        : "outline"
                    }
                    className="capitalize"
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" /> Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="h-4 w-4 mr-2" /> Send
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => deleteInvoice.mutate(invoice.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoicesList;
