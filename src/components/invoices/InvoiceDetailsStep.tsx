import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  IndianRupee,
  Trash2,
  Plus,
  ChevronsUpDown
} from "lucide-react";
import { useEffect } from "react";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";

const InvoiceDetailsStep = ({ 
  clients,
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
  calculateTotal
}) => {
  const {
    form,
    clients,
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
    calculateTotal
  } = useInvoiceForm();

  // Auto-generate sequential invoice number
  useEffect(() => {
    const currentNumber = form.getValues("invoiceNumber");
    if (!currentNumber || currentNumber === "") {
      // Create an invoice number with format INV-YYYY-001
      const year = new Date().getFullYear();
      const number = Math.floor(1000 + Math.random() * 9000);
      form.setValue("invoiceNumber", `INV-${year}-${number}`);
    }
  }, [form]);

  return (
    <div className="space-y-8">
      {/* Basic invoice details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Date*</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date*</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormItem>
            <FormLabel>Client*</FormLabel>
            <Select
              value={form.getValues("clientId") || ""}
              onValueChange={(value) => handleClientChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="clientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Address</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Additional fields toggler */}
      <div className="flex items-center gap-2 mt-4">
        <Checkbox
          id="additionalFields"
          checked={showAdditionalFields}
          onCheckedChange={(checked) => setShowAdditionalFields(checked === true)}
        />
        <label htmlFor="additionalFields" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Show Additional Fields
        </label>
      </div>

      {/* Additional fields if enabled */}
      {showAdditionalFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="usd">US Dollar ($)</SelectItem>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                  <SelectItem value="gbp">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            <FormItem>
              <FormLabel>Custom Invoice Title</FormLabel>
              <Input
                value={customInvoiceTitle}
                onChange={(e) => setCustomInvoiceTitle(e.target.value)}
                placeholder="INVOICE"
              />
              <FormDescription>
                Replace the default "INVOICE" title
              </FormDescription>
            </FormItem>
          </div>

          <div className="space-y-4">
            <FormItem>
              <FormLabel>Purchase Order Number</FormLabel>
              <Input
                value={purchaseOrderNumber}
                onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                placeholder="Optional"
              />
            </FormItem>

            <FormItem>
              <FormLabel>Reference Number</FormLabel>
              <Input
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Optional"
              />
            </FormItem>

            <FormItem>
              <FormLabel>Custom Subtitle</FormLabel>
              <Input
                value={customSubtitle}
                onChange={(e) => setCustomSubtitle(e.target.value)}
                placeholder="Optional subtitle"
              />
            </FormItem>
          </div>
        </div>
      )}

      {/* Shipping details toggler */}
      <div className="flex items-center gap-2 mt-4">
        <Checkbox
          id="shippingDetails"
          checked={showShippingDetails}
          onCheckedChange={(checked) => setShowShippingDetails(checked === true)}
        />
        <label htmlFor="shippingDetails" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Include Shipping Details
        </label>
      </div>

      {/* Transport details toggler */}
      <div className="flex items-center gap-2 mt-2">
        <Checkbox
          id="transportDetails"
          checked={showTransportDetails}
          onCheckedChange={(checked) => setShowTransportDetails(checked === true)}
        />
        <label htmlFor="transportDetails" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Include Transport Details
        </label>
      </div>

      <Separator />

      {/* Invoice items */}
      <div>
        <h3 className="text-lg font-medium mb-4">Invoice Items</h3>

        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 mb-4 items-start"
          >
            <div className="col-span-5">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(item.id, "description", e.target.value)
                    }
                    placeholder="Item description"
                  />
                </FormControl>
              </FormItem>
            </div>

            <div className="col-span-2">
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
              </FormItem>
            </div>

            <div className="col-span-2">
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      className="pl-8"
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "rate",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </FormControl>
              </FormItem>
            </div>

            <div className="col-span-2">
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </span>
                    <Input
                      readOnly
                      type="number"
                      value={item.amount}
                      className="pl-8 bg-muted"
                    />
                  </div>
                </FormControl>
              </FormItem>
            </div>

            <div className="col-span-1 pt-8">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveItem(item.id)}
                disabled={items.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddItem}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>

          <div className="text-right">
            <div className="flex justify-end space-x-4 mb-2">
              <span className="font-medium">Total:</span>
              <span className="font-bold">
                ₹{calculateTotal().toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Notes and terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Additional notes for the client..."
                />
              </FormControl>
              <FormDescription>
                These notes will be displayed on the invoice
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terms & Conditions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Payment terms and conditions..."
                />
              </FormControl>
              <FormDescription>
                Terms and conditions for this invoice
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default InvoiceDetailsStep;
