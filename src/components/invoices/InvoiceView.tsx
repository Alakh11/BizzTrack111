import React from "react";
import {
  Dialog,
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

interface InvoiceViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: any;
}

const InvoiceView = ({ open, onOpenChange, invoice }: InvoiceViewProps) => {
  const navigate = useNavigate();

  if (!invoice) return null;

  const handleEdit = () => {
    onOpenChange(false);
    navigate(`/invoices/edit/${invoice.id}`, { state: { invoice } });
  };

  const handleDownload = () => {
    // Create a printable version of the invoice
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <Button>
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceView;
