
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, PlusCircle, Tag, Truck, Receipt } from "lucide-react";
import { Client } from "@/hooks/useClients";
import { BillingDetailsForm } from "./BillingDetailsForm";
import ShippingDetailsForm from "./ShippingDetailsForm";
import TransportDetailsForm from "./TransportDetailsForm";
import GstDetailsForm from "./GstDetailsForm";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface InvoiceDetailsStepProps {
  form: UseFormReturn<any>;
  clients: Client[];
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
  setPurchaseOrderNumber: (number: string) => void;
  referenceNumber: string;
  setReferenceNumber: (number: string) => void;
  handleClientChange: (clientId: string) => void;
  handleItemChange: (id: number, field: string, value: string | number) => void;
  handleAddItem: () => void;
  handleRemoveItem: (id: number) => void;
  calculateTotal: () => number;
}

const InvoiceDetailsStep: React.FC<InvoiceDetailsStepProps> = ({
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
  calculateTotal,
}) => {
  // Keep the GST details from being reset when the toggle is clicked
  const gstData = {
    taxType: form.getValues("taxType") || "gst",
    placeOfSupply: form.getValues("placeOfSupply") || "",
    gstType: form.getValues("gstType") || "",
    gstNumber: form.getValues("gstNumber") || "",
    reverseCharge: form.getValues("gstReverseCharge") || false,
    nonGstClient: form.getValues("nonGstClient") || false,
  };

  // Initialize items for the form
  useEffect(() => {
    form.setValue("items", items);
  }, [form, items]);

  // Date formatters for date pickers
  const handleInvoiceDateChange = (date: Date | undefined) => {
    if (date) {
      form.setValue("invoiceDate", format(date, "yyyy-MM-dd"));
    }
  };

  const handleDueDateChange = (date: Date | undefined) => {
    if (date) {
      form.setValue("dueDate", format(date, "yyyy-MM-dd"));
    }
  };

  return (
    <div className="space-y-8">
      {/* Date and Number Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <input
                    className="w-full p-2 border rounded"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Invoice Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal flex justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={handleInvoiceDateChange}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal flex justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={handleDueDateChange}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      
      {/* Billing Details */}
      <BillingDetailsForm
        form={form}
        clients={clients}
        handleClientChange={handleClientChange}
      />
      
      {/* Invoice Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Invoice Items</h3>
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5/12">
                  Item Description
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Rate
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      placeholder="Enter item description"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded text-right"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "quantity",
                          parseFloat(e.target.value)
                        )
                      }
                      placeholder="0"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded text-right"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "rate",
                          parseFloat(e.target.value)
                        )
                      }
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-2 text-right">
                    <input
                      type="number"
                      className="w-full p-2 border rounded text-right"
                      readOnly
                      value={item.amount}
                    />
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 text-sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddItem}
            className="flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Item
          </Button>
          <div className="text-right space-y-1">
            <div className="flex justify-end items-center space-x-4">
              <span className="font-medium">Total:</span>
              <span className="text-lg font-bold">₹{calculateTotal().toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Details Collapsible */}
      <Collapsible
        open={showAdditionalFields}
        onOpenChange={setShowAdditionalFields}
        className="border rounded-md p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag size={20} />
            <h3 className="text-lg font-medium">Additional Details</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {showAdditionalFields ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Custom Invoice Title
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={customInvoiceTitle}
                onChange={(e) => setCustomInvoiceTitle(e.target.value)}
                placeholder="INVOICE"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Custom Subtitle
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={customSubtitle}
                onChange={(e) => setCustomSubtitle(e.target.value)}
                placeholder="Optional subtitle"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                <option value="inr">INR (₹)</option>
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Purchase Order Number
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={purchaseOrderNumber}
                onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                placeholder="PO-12345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Reference Number
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="REF-12345"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* GST Details */}
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt size={20} />
            <h3 className="text-lg font-medium">GST Details</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsGstDialogOpen(true)}
            className="text-sm"
          >
            {gstData.gstNumber ? "Edit GST Details" : "Add GST Details"}
          </Button>
        </div>
        
        {gstData.gstNumber && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">GST Number</p>
              <p className="font-medium">{gstData.gstNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">GST Type</p>
              <p className="font-medium capitalize">{gstData.gstType}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Shipping Details Collapsible */}
      <Collapsible
        open={showShippingDetails}
        onOpenChange={setShowShippingDetails}
        className="border rounded-md p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck size={20} />
            <h3 className="text-lg font-medium">Shipping Details</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {showShippingDetails ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pt-4">
          <ShippingDetailsForm form={form} />
        </CollapsibleContent>
      </Collapsible>
      
      {/* Transport Details Collapsible */}
      <Collapsible
        open={showTransportDetails}
        onOpenChange={setShowTransportDetails}
        className="border rounded-md p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck size={20} />
            <h3 className="text-lg font-medium">Transport Details</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {showTransportDetails ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pt-4">
          <TransportDetailsForm form={form} />
        </CollapsibleContent>
      </Collapsible>
      
      {/* Notes and Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Notes</label>
          <textarea
            className="w-full p-2 border rounded h-32"
            placeholder="Enter notes for the client"
            {...form.register("notes")}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Terms and Conditions</label>
          <textarea
            className="w-full p-2 border rounded h-32"
            placeholder="Enter terms and conditions"
            {...form.register("terms")}
          />
        </div>
      </div>
      
      {/* GST Dialog */}
      <GstDetailsForm 
        open={isGstDialogOpen} 
        onOpenChange={setIsGstDialogOpen}
        form={form}
      />
    </div>
  );
};

export default InvoiceDetailsStep;
