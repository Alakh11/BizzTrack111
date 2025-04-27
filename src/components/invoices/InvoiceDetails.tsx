
import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface InvoiceDetailsProps {
  form: any;
  showAdditionalFields: boolean;
  setShowAdditionalFields: (show: boolean) => void;
  purchaseOrderNumber: string;
  setPurchaseOrderNumber: (value: string) => void;
  referenceNumber: string;
  setReferenceNumber: (value: string) => void;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  form,
  showAdditionalFields,
  setShowAdditionalFields,
  purchaseOrderNumber,
  setPurchaseOrderNumber,
  referenceNumber,
  setReferenceNumber,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium font-playfair">Invoice Information</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="invoiceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invoice Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invoiceDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invoice Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="dueDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Due Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        variant="ghost"
        className="flex items-center text-sm"
        onClick={() => setShowAdditionalFields(!showAdditionalFields)}
      >
        <Plus className="h-4 w-4 mr-1" /> Add More Fields
      </Button>

      {showAdditionalFields && (
        <div className="space-y-4 pt-2 border-t">
          <FormItem>
            <FormLabel>Purchase Order Number</FormLabel>
            <FormControl>
              <Input
                value={purchaseOrderNumber}
                onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                placeholder="Enter PO number"
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Reference Number</FormLabel>
            <FormControl>
              <Input
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Enter reference number"
              />
            </FormControl>
          </FormItem>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetails;
