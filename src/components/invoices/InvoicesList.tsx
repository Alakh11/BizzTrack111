
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Edit,
} from "lucide-react";
import { useInvoices } from "@/hooks/useInvoices";
import InvoiceView from "./InvoiceView";
import { Dialog } from "@/components/ui/dialog";
import InvoicePrintRenderer from "./InvoicePrintRenderer";

interface InvoicesListProps {
  filterStatus?: string;
}

const InvoicesList = ({ filterStatus = "all" }: InvoicesListProps) => {
  const { invoices, isLoading, deleteInvoice } = useInvoices();
  const [viewingInvoice, setViewingInvoice] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewInvoice = (invoice: any) => {
    setViewingInvoice(invoice);
    setIsViewOpen(true);
  };

  const handleEditInvoice = (invoice: any) => {
    navigate(`/invoices/edit/${invoice.id}`, { state: { invoice } });
  };

  const handlePrintInvoice = (invoice: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    printWindow.document.write(InvoicePrintRenderer.getHtml(invoice));
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  if (isLoading) {
    return <InvoicesListSkeleton />;
  }

  if (!invoices || invoices.length === 0) {
    return <EmptyInvoicesList />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold font-playfair">All Invoices</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={filterStatus}>
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
              <TableHead className="font-medium">Invoice #</TableHead>
              <TableHead className="font-medium">Client</TableHead>
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium">Due Date</TableHead>
              <TableHead className="font-medium">Amount</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                className="hover:bg-muted/20 cursor-pointer"
                onClick={() => handleViewInvoice(invoice)}
              >
                <TableCell className="font-medium">
                  {invoice.invoice_number}
                </TableCell>
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
                  <InvoiceStatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="text-right">
                  <InvoiceActions 
                    invoice={invoice}
                    onView={handleViewInvoice}
                    onEdit={handleEditInvoice}
                    onPrint={handlePrintInvoice}
                    onDelete={() => deleteInvoice.mutate(invoice.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Invoice View Dialog */}
      {viewingInvoice && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <InvoiceView invoice={viewingInvoice} open={isViewOpen} onOpenChange={setIsViewOpen} />
        </Dialog>
      )}
    </div>
  );
};

const InvoiceStatusBadge = ({ status }: { status?: string }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "paid":
        return "bg-success/10 text-success border-success";
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive";
      default:
        return "bg-warning/10 text-warning border-warning";
    }
  };

  return (
    <Badge
      variant="outline"
      className={`capitalize ${getStatusStyle()}`}
    >
      {status || "pending"}
    </Badge>
  );
};

interface InvoiceActionsProps {
  invoice: any;
  onView: (invoice: any) => void;
  onEdit: (invoice: any) => void;
  onPrint: (invoice: any) => void;
  onDelete: () => void;
}

const InvoiceActions = ({ invoice, onView, onEdit, onPrint, onDelete }: InvoiceActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onView(invoice);
          }}
        >
          <Eye className="h-4 w-4 mr-2" /> View
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit(invoice);
          }}
        >
          <Edit className="h-4 w-4 mr-2" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onPrint(invoice);
          }}
        >
          <Download className="h-4 w-4 mr-2" /> Download
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Send className="h-4 w-4 mr-2" /> Send
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash className="h-4 w-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const InvoicesListSkeleton = () => {
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
};

const EmptyInvoicesList = () => {
  return (
    <div className="text-center py-10 border rounded-lg bg-white">
      <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
      <h3 className="mt-4 text-lg font-medium font-playfair">
        No invoices found
      </h3>
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
};

export default InvoicesList;
