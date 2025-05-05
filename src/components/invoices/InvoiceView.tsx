
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

  const handlePrint = () => {
    InvoicePrintRenderer.printInvoice(invoice);
  };

  const handleDownload = () => {
    InvoicePrintRenderer.downloadInvoice(invoice);
  };
  
  const handleShare = () => {
    // Preview in a new tab
    InvoicePrintRenderer.previewInvoice(invoice);
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

  // Parse metadata for additional info
  let metadata: any = {};
  try {
    if (invoice.metadata) {
      metadata = JSON.parse(invoice.metadata);
    }
  } catch (e) {
    console.error("Error parsing invoice metadata", e);
  }

  // Get design settings and other metadata
  const design = metadata.design || {};
  const gst = metadata.gst || {};
  const shipping = metadata.shipping || {};
  const transport = metadata.transport || {};
  const payment = metadata.payment || {};

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
            <div className="text-2xl font-bold font-playfair">
              {design.title || "INVOICE"}
            </div>
            <div className="text-muted-foreground text-sm">
              {invoice.invoice_number}
            </div>
          </div>
          <div className="h-16 w-16 bg-gray-100 flex items-center justify-center rounded border">
            {design.logo ? (
              <img src={design.logo} alt="Logo" className="max-h-full max-w-full object-contain" />
            ) : (
              <span className="text-xl font-bold">Logo</span>
            )}
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

        {/* GST Details if available */}
        {gst && gst.gstNumber && (
          <div className="bg-muted/10 p-4 rounded-md space-y-2">
            <h3 className="font-medium">GST Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">GST Number:</span>
                <p>{gst.gstNumber}</p>
              </div>
              {gst.gstType && (
                <div>
                  <span className="text-sm text-muted-foreground">GST Type:</span>
                  <p>{gst.gstType}</p>
                </div>
              )}
              {gst.placeOfSupply && (
                <div>
                  <span className="text-sm text-muted-foreground">Place of Supply:</span>
                  <p>{gst.placeOfSupply}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Shipping Details if available */}
        {shipping && (shipping.from || shipping.to) && (
          <div className="bg-muted/10 p-4 rounded-md space-y-2">
            <h3 className="font-medium">Shipping Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shipping.from && (
                <div>
                  <span className="text-sm text-muted-foreground">From:</span>
                  <p>{shipping.from.name}</p>
                  <p>{shipping.from.address}</p>
                  <p>{shipping.from.city} {shipping.from.state} {shipping.from.postal}</p>
                </div>
              )}
              {shipping.to && (
                <div>
                  <span className="text-sm text-muted-foreground">To:</span>
                  <p>{shipping.to.name}</p>
                  <p>{shipping.to.address}</p>
                  <p>{shipping.to.city} {shipping.to.state} {shipping.to.postal}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transport Details if available */}
        {transport && transport.transporter && (
          <div className="bg-muted/10 p-4 rounded-md space-y-2">
            <h3 className="font-medium">Transport Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Transporter:</span>
                <p>{transport.transporter}</p>
              </div>
              {transport.mode && (
                <div>
                  <span className="text-sm text-muted-foreground">Mode:</span>
                  <p>{transport.mode}</p>
                </div>
              )}
              {transport.vehicleNumber && (
                <div>
                  <span className="text-sm text-muted-foreground">Vehicle Number:</span>
                  <p>{transport.vehicleNumber}</p>
                </div>
              )}
            </div>
          </div>
        )}

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

        {/* Payment Details */}
        {payment && (payment.bank?.accountNumber || payment.upi?.id) && (
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Payment Details</h3>
            {payment.bank?.accountNumber && (
              <div className="space-y-1 mb-2">
                <h4 className="text-sm font-medium">Bank Details:</h4>
                <p className="text-sm">Bank: {payment.bank.name || 'N/A'}</p>
                <p className="text-sm">Account Number: {payment.bank.accountNumber}</p>
                {payment.bank.ifscCode && <p className="text-sm">IFSC: {payment.bank.ifscCode}</p>}
                {payment.bank.accountHolderName && <p className="text-sm">Account Holder: {payment.bank.accountHolderName}</p>}
              </div>
            )}
            {payment.upi?.id && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium">UPI Details:</h4>
                <p className="text-sm">UPI ID: {payment.upi.id}</p>
                {payment.upi.name && <p className="text-sm">UPI Name: {payment.upi.name}</p>}
              </div>
            )}
          </div>
        )}

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

        {/* Signature */}
        {design.signature && (
          <div className="mt-6 border-t pt-4">
            <div className="text-right">
              <img 
                src={design.signature} 
                alt="Signature" 
                className="max-h-16 inline-block" 
              />
              <p className="text-xs mt-1 border-t border-gray-300 inline-block pt-1">
                Authorized Signature
              </p>
            </div>
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
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default InvoiceView;
