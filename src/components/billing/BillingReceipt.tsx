
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
import { formatCurrency } from "@/lib/utils";

interface BillingItem {
  product: Product;
  quantity: number;
}

interface BillingReceiptProps {
  items: BillingItem[];
  transactionNumber: string;
  totalAmount: number;
  date: Date;
  onPrint: () => void;
  onClose: () => void;
}

const BillingReceipt: React.FC<BillingReceiptProps> = ({
  items,
  transactionNumber,
  totalAmount,
  date,
  onPrint,
  onClose,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Receipt</h2>
        <p className="text-muted-foreground">
          Transaction #{transactionNumber}
        </p>
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {date.toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Time:</span>{" "}
            {date.toLocaleTimeString()}
          </p>
        </div>
      </div>

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
              <TableCell>{item.product.name}</TableCell>
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
        <div className="w-1/3 space-y-1">
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

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onPrint}>Print Receipt</Button>
      </div>
    </div>
  );
};

export default BillingReceipt;
