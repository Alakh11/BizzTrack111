
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Product } from "@/hooks/useProducts";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Printer, X } from "lucide-react";

interface BillingItem {
  product: Product;
  quantity: number;
}

interface BillingReceiptProps {
  items: BillingItem[];
  transactionNumber: string;
  totalAmount: number;
  date: Date;
  paymentMethod?: string;
  customerName?: string;
  customerMobile?: string;
  onPrint: () => void;
  onClose: () => void;
}

const BillingReceipt: React.FC<BillingReceiptProps> = ({
  items,
  transactionNumber,
  totalAmount,
  date,
  paymentMethod = "Cash",
  customerName,
  customerMobile,
  onPrint,
  onClose,
}) => {
  return (
    <div className="space-y-6 print:p-0 print:m-0" id="receipt">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <h2 className="text-2xl font-bold print:text-xl">Receipt</h2>
          <p className="text-muted-foreground print:text-sm">
            Transaction #{transactionNumber}
          </p>
        </div>
        <div className="flex space-x-2 print:hidden">
          <Button variant="outline" size="icon" onClick={onPrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border-t border-b py-4 border-gray-200 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium">Date:</p>
          <p>{formatDate(date.toISOString())}</p>
        </div>
        <div>
          <p className="font-medium">Time:</p>
          <p>{date.toLocaleTimeString()}</p>
        </div>
        <div>
          <p className="font-medium">Transaction ID:</p>
          <p>{transactionNumber}</p>
        </div>
        <div>
          <p className="font-medium">Payment Method:</p>
          <p>{paymentMethod.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>
        </div>
      </div>

      {/* Customer information section */}
      {(customerName || customerMobile) && (
        <div className="border-b border-gray-200 py-4">
          <h3 className="font-medium mb-2">Customer Information:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {customerName && (
              <div>
                <p className="font-medium">Name:</p>
                <p>{customerName}</p>
              </div>
            )}
            {customerMobile && (
              <div>
                <p className="font-medium">Mobile:</p>
                <p>{customerMobile}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <div>
                  <p>{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">SKU: {item.product.sku}</p>
                </div>
              </TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.product.price)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.product.price * item.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end">
        <div className="w-1/2 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal:</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mt-6 text-center text-sm text-muted-foreground">
        <p>Thank you for your business!</p>
        <p>All goods sold are non-returnable.</p>
      </div>

      <div className="flex justify-between mt-8 print:hidden">
        <Button variant="outline" onClick={onClose}>
          New Transaction
        </Button>
        <Button onClick={onPrint}>Print Receipt</Button>
      </div>
    </div>
  );
};

export default BillingReceipt;
