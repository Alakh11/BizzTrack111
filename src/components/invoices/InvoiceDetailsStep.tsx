
import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, IndianRupee } from "lucide-react";

import { BillingDetailsForm } from "@/components/invoices/BillingDetailsForm";
import ShippingDetailsForm from "@/components/invoices/ShippingDetailsForm";
import TransportDetailsForm from "@/components/invoices/TransportDetailsForm";
import GstDetailsForm from "@/components/invoices/GstDetailsForm";
import { Client } from "@/hooks/useClients";

interface InvoiceDetailsStepProps {
  form: any;
  clients?: Client[];
  items: any[];
  showShippingDetails: boolean;
  setShowShippingDetails: (show: boolean) => void;
  showTransportDetails: boolean;
  setShowTransportDetails: (show: boolean) => void;
  isGstDialogOpen: boolean;
  setIsGstDialogOpen: (open: boolean) => void;
  showAdditionalFields: boolean;
  setShowAdditionalFields: (show: boolean) => void;
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
  handleClientChange: (clientId: string) => void;
  handleItemChange: (id: number, field: string, value: any) => void;
  handleAddItem: () => void;
  handleRemoveItem: (id: number) => void;
  calculateTotal: () => number;
}

const InvoiceDetailsStep: React.FC<InvoiceDetailsStepProps> = ({
  form,
  clients = [],
  items,
  showShippingDetails,
  setShowShippingDetails,
  showTransportDetails,
  setShowTransportDetails,
  isGstDialogOpen,
  setIsGstDialogOpen,
  showAdditionalFields,
  setShowAdditionalFields,
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
  handleClientChange,
  handleItemChange,
  handleAddItem,
  handleRemoveItem,
  calculateTotal,
}) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <FormItem className="w-full">
            <Input
              className="text-2xl font-bold border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-playfair"
              value={customInvoiceTitle}
              onChange={(e) => setCustomInvoiceTitle(e.target.value)}
              placeholder="INVOICE"
            />
          </FormItem>
        </div>

        <div>
          <Input
            className="text-sm text-muted-foreground border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={customSubtitle}
            onChange={(e) => setCustomSubtitle(e.target.value)}
            placeholder="Add Subtitle (Optional)"
          />
        </div>
      </div>

      {/* Invoice Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>

      <Button
        type="button"
        variant="ghost"
        className="flex items-center text-sm"
        onClick={() => setShowAdditionalFields(!showAdditionalFields)}
      >
        <Plus className="h-4 w-4 mr-1" /> Add More Fields
      </Button>

      {showAdditionalFields && (
        <div className="space-y-4 pt-2 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <Separator className="my-6" />

      {/* Billing Info */}
      <BillingDetailsForm
        form={form}
        clients={clients}
        handleClientChange={handleClientChange}
      />

      <Separator className="my-6" />

      {/* Shipping Details Toggle */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="shipping"
          checked={showShippingDetails}
          onCheckedChange={(checked) => setShowShippingDetails(!!checked)}
        />
        <label
          htmlFor="shipping"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Add Shipping Details
        </label>
      </div>

      {/* Shipping Details Section */}
      {showShippingDetails && (
        <ShippingDetailsForm
          form={form}
          clientName={form.getValues("clientName")}
          clientAddress={form.getValues("clientAddress")}
        />
      )}

      <Separator className="my-6" />

      {/* Transport Details Toggle */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="transport"
          checked={showTransportDetails}
          onCheckedChange={(checked) => setShowTransportDetails(!!checked)}
        />
        <label
          htmlFor="transport"
          className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Add Transport Details
        </label>
      </div>

      {showTransportDetails && <TransportDetailsForm form={form} />}

      <Separator className="my-6" />

      {/* GST Details Button */}
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsGstDialogOpen(true)}
          className="flex items-center"
        >
          Add GST Details
        </Button>
      </div>

      {/* GST Details Dialog */}
      <GstDetailsForm
        open={isGstDialogOpen}
        onOpenChange={setIsGstDialogOpen}
        form={form}
      />

      <Separator className="my-6" />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium font-playfair">Invoice Items</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddItem}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Item
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-medium">Item</th>
                <th className="text-right py-2 px-2 font-medium">Qty</th>
                <th className="text-right py-2 px-2 font-medium">Rate (₹)</th>
                <th className="text-right py-2 px-2 font-medium">
                  Amount (₹)
                </th>
                <th className="py-2 px-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-2">
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      className="w-full"
                      placeholder="Enter item description"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 text-right"
                      min={1}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center justify-end">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "rate",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-28 text-right"
                        min={0}
                        step={0.01}
                      />
                    </div>
                  </td>
                  <td className="py-2 px-2 text-right">
                    <div className="flex items-center justify-end">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {item.amount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-gray-400 hover:text-red-500"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right py-4 font-medium">
                  Total:
                </td>
                <td className="text-right py-4 font-medium flex justify-end items-center">
                  <IndianRupee className="h-3 w-3 mr-1" />
                  {calculateTotal().toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsStep;
