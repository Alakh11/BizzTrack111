import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdditionalFieldsProps {
  customInvoiceTitle: string;
  setCustomInvoiceTitle: (title: string) => void;
  customSubtitle: string;
  setCustomSubtitle: (subtitle: string) => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  purchaseOrderNumber: string;
  setPurchaseOrderNumber: (po: string) => void;
  referenceNumber: string;
  setReferenceNumber: (ref: string) => void;
}

const AdditionalFields = ({
  customInvoiceTitle,
  setCustomInvoiceTitle,
  customSubtitle,
  setCustomSubtitle,
  selectedCurrency,
  setSelectedCurrency,
  purchaseOrderNumber,
  setPurchaseOrderNumber,
  referenceNumber,
  setReferenceNumber,
}: AdditionalFieldsProps) => {
  return (
    <div className="space-y-4 border rounded-md p-4 bg-muted/20 dark:bg-gray-800/30 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-2">Custom Invoice Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="custom-title">Custom Invoice Title</Label>
          <Input
            id="custom-title"
            value={customInvoiceTitle}
            onChange={(e) => setCustomInvoiceTitle(e.target.value)}
            placeholder="Invoice"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="custom-subtitle">Custom Subtitle</Label>
          <Input
            id="custom-subtitle"
            value={customSubtitle}
            onChange={(e) => setCustomSubtitle(e.target.value)}
            placeholder="Thank you for your business"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
              <SelectItem value="usd">US Dollar ($)</SelectItem>
              <SelectItem value="eur">Euro (€)</SelectItem>
              <SelectItem value="gbp">British Pound (£)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="po-number">Purchase Order Number</Label>
          <Input
            id="po-number"
            value={purchaseOrderNumber}
            onChange={(e) => setPurchaseOrderNumber(e.target.value)}
            placeholder="PO-123456"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reference">Reference Number</Label>
          <Input
            id="reference"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder="REF-123456"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalFields;
