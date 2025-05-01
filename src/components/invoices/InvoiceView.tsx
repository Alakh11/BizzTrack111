
import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2, Edit, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { IndianRupee } from "lucide-react";
import InvoicePrintRenderer from "./InvoicePrintRenderer";

export interface InvoiceViewProps {
  invoice: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const InvoiceView = ({ invoice, open, onOpenChange }: InvoiceViewProps) => {
  const navigate = useNavigate();

  if (!invoice) return null;

  const handleEdit = () => {
    if (onOpenChange) onOpenChange(false);
    navigate(`/invoices/edit/${invoice.id}`, { state: { invoice } });
  };

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(InvoicePrintRenderer.getHtml(invoice));
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const getStatusColor = (status: string) => {
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
    <DialogContent className="max-w-4xl h-[85vh] overflow-y-auto">
      <DialogHeader>
        <div className="flex justify-between items-center">
          <DialogTitle className="text-2xl font-playfair">
            Invoice #{invoice.invoice_number}
          </DialogTitle>
          <Badge
            className={`${getStatusColor(invoice.status)} capitalize px-3 py-1`}
          >
            {invoice.status}
          </Badge>
        </div>
        <DialogDescription>
          Created on {new Date(invoice.created_at).toLocaleDateString()}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-8">
        {/* Invoice Header with Logo */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold font-playfair">INVOICE</div>
            <div className="text-muted-foreground text-sm">
              {invoice.invoice_number}
            </div>
          </div>
          <div className="h-16 w-16 bg-gray-100 flex items-center justify-center rounded border">
            <span className="text-xl font-bold">Logo</span>
          </div>
        </div>

        {/* Business and Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">
              From
            </h3>
            <div className="font-medium">Alakh Corporation</div>
            <div className="text-sm text-muted-foreground">
              Mirzapur, UP, India - 231312
            </div>
            <div className="text-sm text-muted-foreground">
              +91 9580813770
            </div>
            <div className="text-sm text-muted-foreground">
              alakh1304@gmail.com
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">To</h3>
            <div className="font-medium">
              {invoice.client?.name || "Client Name"}
            </div>
            <div className="text-sm text-muted-foreground">
              {invoice.client?.address || "Client Address"}
            </div>
            <div className="text-sm text-muted-foreground">
              {invoice.client?.email || "Client Email"}
            </div>
            <div className="text-sm text-muted-foreground">
              {invoice.client?.phone || "Client Phone"}
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/20 p-4 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground">
              Invoice Date
            </h3>
            <p>{new Date(invoice.invoice_date).toLocaleDateString()}</p>
          </div>
          <div className="bg-muted/20 p-4 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground">
              Due Date
            </h3>
            <p>{new Date(invoice.due_date).toLocaleDateString()}</p>
          </div>
          <div className="bg-muted/20 p-4 rounded-md">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Amount
            </h3>
            <p className="flex items-center font-medium text-lg">
              <IndianRupee className="h-4 w-4 mr-1" />
              {invoice.total_amount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/30">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Rate
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {invoice.invoice_items?.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {item.description}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                    <div className="flex items-center justify-end">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {item.unit_price.toLocaleString("en-IN")}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-right">
                    <div className="flex items-center justify-end">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {item.amount.toLocaleString("en-IN")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-muted/10">
                <th
                  colSpan={3}
                  className="px-4 py-3 text-right text-sm font-medium"
                >
                  Total:
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  <div className="flex items-center justify-end">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    {invoice.total_amount.toLocaleString("en-IN")}
                  </div>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Notes & Terms */}
        {(invoice.notes || invoice.terms) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {invoice.notes && (
              <div className="space-y-2">
                <h3 className="font-medium">Notes</h3>
                <p className="text-sm text-muted-foreground">
                  {invoice.notes}
                </p>
              </div>
            )}
            {invoice.terms && (
              <div className="space-y-2">
                <h3 className="font-medium">Terms and Conditions</h3>
                <p className="text-sm text-muted-foreground">
                  {invoice.terms}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <DialogFooter className="flex justify-between items-center mt-8">
        <Button variant="outline" onClick={() => onOpenChange && onOpenChange(false)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button>
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default InvoiceView;
