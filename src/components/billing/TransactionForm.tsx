
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { Transaction } from "@/hooks/useTransactions";

interface TransactionFormProps {
  transactionNumber: string;
  totalAmount: number;
  onSubmit: (transactionData: Partial<Transaction>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const PAYMENT_METHODS = [
  "cash",
  "credit_card",
  "debit_card",
  "upi",
  "net_banking",
  "wallet",
  "other",
];

const TransactionForm: React.FC<TransactionFormProps> = ({
  transactionNumber,
  totalAmount,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      transaction_number: transactionNumber,
      date: new Date().toISOString(),
      total_amount: totalAmount,
      payment_method: paymentMethod,
      status: "completed",
      notes,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Transaction</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transactionNumber">Transaction Number</Label>
              <Input
                id="transactionNumber"
                value={transactionNumber}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input
                id="totalAmount"
                value={formatCurrency(totalAmount)}
                readOnly
                className="bg-muted font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this transaction"
              className="resize-none"
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Complete Transaction"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TransactionForm;
