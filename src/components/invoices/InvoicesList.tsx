
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

interface Client {
  id?: string;
  name: string;
  email?: string;
  address?: string;
  phone?: string;
}

const InvoicesList = () => {
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
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold font-playfair">All Invoices</h2>
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
                  <Badge
                    variant={
                      invoice.status === "paid"
                        ? "outline"
                        : invoice.status === "overdue"
                          ? "destructive"
                          : "outline"
                    }
                    className={`capitalize ${
                      invoice.status === "paid"
                        ? "bg-success/10 text-success border-success"
                        : invoice.status === "overdue"
                          ? "bg-destructive/10"
                          : "bg-warning/10 text-warning border-warning"
                    }`}
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
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
                          handleViewInvoice(invoice);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditInvoice(invoice);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          const printWindow = window.open("", "_blank");
                          if (!printWindow) return;
                          const html = `
                          <html>
                            <head>
                              <title>Invoice #${invoice.invoice_number}</title>
                              <style>
                                body { font-family: 'Arial', sans-serif; margin: 0; padding: 30px; }
                                .invoice { max-width: 800px; margin: 0 auto; border: 1px solid #eee; padding: 30px; }
                                .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                                .logo { font-size: 24px; font-weight: bold; }
                                .title { text-align: center; margin: 20px 0; }
                                .info { display: flex; justify-content: space-between; margin-bottom: 30px; }
                                .info-block { width: 45%; }
                                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
                                th { background-color: #f8f9fa; }
                                .total { text-align: right; margin-top: 20px; }
                                .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
                              </style>
                            </head>
                            <body>
                              <div class="invoice">
                                <div class="header">
                                  <div class="logo">BizzTrack</div>
                                  <div>
                                    <h1>INVOICE</h1>
                                    <p>#${invoice.invoice_number}</p>
                                  </div>
                                </div>
                                
                                <div class="info">
                                  <div class="info-block">
                                    <h3>From:</h3>
                                    <p>Alakh Corporation<br>
                                    Mirzapur, UP, India - 231312<br>
                                    +91 9580813770<br>
                                    alakh1304@gmail.com</p>
                                  </div>
                                  <div class="info-block">
                                    <h3>To:</h3>
                                    <p>${invoice.client?.name || "Client"}<br>
                                    ${invoice.client?.address || ""}<br>
                                    ${invoice.client?.email || ""}</p>
                                  </div>
                                </div>
                                
                                <div class="info">
                                  <div class="info-block">
                                    <h3>Invoice Date:</h3>
                                    <p>${new Date(invoice.invoice_date).toLocaleDateString()}</p>
                                  </div>
                                  <div class="info-block">
                                    <h3>Due Date:</h3>
                                    <p>${new Date(invoice.due_date).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Item</th>
                                      <th>Qty</th>
                                      <th>Rate (₹)</th>
                                      <th>Amount (₹)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    ${
                                      invoice.invoice_items
                                        ?.map(
                                          (item: any) => `
                                    <tr>
                                      <td>${item.description}</td>
                                      <td>${item.quantity}</td>
                                      <td>${item.unit_price}</td>
                                      <td>${item.amount}</td>
                                    </tr>
                                    `,
                                        )
                                        .join("") || ""
                                    }
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <th colspan="3">Total:</th>
                                      <th>₹ ${invoice.total_amount.toLocaleString("en-IN")}</th>
                                    </tr>
                                  </tfoot>
                                </table>
                                
                                ${invoice.notes ? `<div><h3>Notes:</h3><p>${invoice.notes}</p></div>` : ""}
                                ${invoice.terms ? `<div><h3>Terms and Conditions:</h3><p>${invoice.terms}</p></div>` : ""}
                                
                                <div class="footer">
                                  <p>Thank you for your business!</p>
                                </div>
                              </div>
                            </body>
                          </html>
                        `;

                          printWindow.document.write(html);
                          printWindow.document.close();
                          setTimeout(() => {
                            printWindow.print();
                          }, 500);
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
                          deleteInvoice.mutate(invoice.id);
                        }}
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

      {/* Invoice View Dialog */}
      {viewingInvoice && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <InvoiceView invoice={viewingInvoice} />
        </Dialog>
      )}
    </div>
  );
};

export default InvoicesList;
