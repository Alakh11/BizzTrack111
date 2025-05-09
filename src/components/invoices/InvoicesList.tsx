import React, { useState } from "react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useInvoices } from "@/hooks/useInvoices";
import {
  MoreHorizontal,
  Eye,
  Download,
  Printer,
  Send,
  Clock,
  ArrowDown,
  ArrowUp,
  Search,
  Trash,
  FileEdit,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import InvoicePrintRenderer from "./InvoicePrintRenderer";
import { Invoice } from "@/types/invoice";

const InvoicesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null,
  );
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const { invoices, isLoading, deleteInvoice, updateInvoice, getInvoice } =
    useInvoices();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p>Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No invoices found</h3>
          <p className="text-muted-foreground mt-1">
            Create your first invoice to get started.
          </p>
          <Button className="mt-4" onClick={() => navigate("/invoices/new")}>
            Create Invoice
          </Button>
        </div>
      </div>
    );
  }

  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleEditStatus = (id: string, currentStatus: string) => {
    setSelectedInvoiceId(id);
    setNewStatus(currentStatus);
    setIsEditStatusModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (selectedInvoiceId && newStatus) {
      try {
        await updateInvoice.mutateAsync({
          id: selectedInvoiceId,
          invoiceData: {
            status: newStatus,
          },
        });

        toast({
          title: "Status updated",
          description: "Invoice status has been updated successfully.",
        });

        setIsEditStatusModalOpen(false);
      } catch (error) {
        console.error("Error updating status:", error);
        toast({
          title: "Error",
          description: "Failed to update invoice status.",
          variant: "destructive",
        });
      }
    }
  };

  const handleConfirmDelete = () => {
    if (selectedInvoiceId) {
      deleteInvoice.mutate(selectedInvoiceId);
    }
    setDeleteConfirmOpen(false);
  };

  const handleDelete = (id: string) => {
    setSelectedInvoiceId(id);
    setDeleteConfirmOpen(true);
  };

  const handleViewInvoice = async (id: string) => {
    try {
      const invoice = (await getInvoice(id)) as unknown as Invoice;
      if (invoice) {
        InvoicePrintRenderer.previewInvoice(invoice);
      }
    } catch (error) {
      console.error("Error viewing invoice:", error);
      toast({
        title: "Error",
        description: "Could not load invoice preview",
        variant: "destructive",
      });
    }
  };

  const handleDownloadInvoice = async (id: string) => {
    try {
      const invoice = (await getInvoice(id)) as unknown as Invoice;
      if (invoice) {
        InvoicePrintRenderer.downloadInvoice(invoice);

        toast({
          title: "Success",
          description: "Invoice downloaded successfully",
        });
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast({
        title: "Error",
        description: "Could not download invoice",
        variant: "destructive",
      });
    }
  };

  const handlePrintInvoice = async (id: string) => {
    try {
      const invoice = (await getInvoice(id)) as unknown as Invoice;
      if (invoice) {
        InvoicePrintRenderer.printInvoice(invoice);
      }
    } catch (error) {
      console.error("Error printing invoice:", error);
      toast({
        title: "Error",
        description: "Could not print invoice",
        variant: "destructive",
      });
    }
  };

  // Filtering and sorting
  const filteredInvoices = invoices
    .filter((invoice) => {
      const matchesSearch =
        (invoice.invoice_number &&
          invoice.invoice_number
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (invoice.client?.name &&
          invoice.client.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Status badge color mapping
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "destructive";
      case "draft":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={handleSort}>
              {sortDirection === "desc" ? (
                <ArrowDown className="h-4 w-4" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
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
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoice_number}
                  </TableCell>
                  <TableCell>{invoice.client?.name || "No client"}</TableCell>
                  <TableCell>
                    {invoice.invoice_date
                      ? format(new Date(invoice.invoice_date), "MMM d, yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {invoice.due_date
                      ? format(new Date(invoice.due_date), "MMM d, yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(Number(invoice.total_amount) || 0)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        getStatusBadgeVariant(invoice.status) as
                          | "default"
                          | "secondary"
                          | "outline"
                          | "destructive"
                          | "success"
                          | "warning"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        handleEditStatus(invoice.id, invoice.status)
                      }
                    >
                      {invoice.status?.charAt(0).toUpperCase() +
                        invoice.status?.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/invoices/edit/${invoice.id}`)
                          }
                        >
                          <FileEdit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleEditStatus(invoice.id, invoice.status)
                          }
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          Change Status
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewInvoice(invoice.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handlePrintInvoice(invoice.id)}
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(invoice.id)}
                          className="text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              invoice and all associated items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Status Dialog */}
      <AlertDialog
        open={isEditStatusModalOpen}
        onOpenChange={setIsEditStatusModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Invoice Status</AlertDialogTitle>
            <AlertDialogDescription>
              Select the new status for this invoice.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateStatus}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InvoicesList;
