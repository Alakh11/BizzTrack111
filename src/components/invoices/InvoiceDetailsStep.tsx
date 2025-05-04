
import React from "react";
import { Product, useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash } from "lucide-react";

interface InvoiceDetailsStepProps {
  form: any;
  clients: any[];
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
  handleItemChange: (index: number, itemId: string) => void;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;
  calculateTotal: () => number;
}

const InvoiceDetailsStep = ({
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
}: InvoiceDetailsStepProps) => {
  const { products = [] } = useProducts();

  return (
    <div className="space-y-4">
      {/* Client Information */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Client Information</h3>
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleClientChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                </FormControl>
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
          )}
        />
      </div>

      {/* Additional Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="flex items-center space-x-2">
          <Switch
            checked={showShippingDetails}
            onCheckedChange={setShowShippingDetails}
            id="shipping-details"
          />
          <Label htmlFor="shipping-details">Include Shipping Details</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={showTransportDetails}
            onCheckedChange={setShowTransportDetails}
            id="transport-details"
          />
          <Label htmlFor="transport-details">Include Transport Details</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={showAdditionalFields}
            onCheckedChange={setShowAdditionalFields}
            id="additional-fields"
          />
          <Label htmlFor="additional-fields">Show Additional Fields</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={isGstDialogOpen}
            onCheckedChange={setIsGstDialogOpen}
            id="gst-details"
          />
          <Label htmlFor="gst-details">Include GST Details</Label>
        </div>
      </div>

      {showAdditionalFields && (
        <div className="space-y-4 border rounded-md p-4 bg-muted/20">
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
              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
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
      )}

      {/* Invoice Items */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Invoice Items</h3>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <FormField
              control={form.control}
              name={`items.${index}.product_id`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item {index + 1}</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleItemChange(index, value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`items.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`items.${index}.unit_price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Unit Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end">
              <Button type="button" variant="destructive" size="sm" onClick={() => handleRemoveItem(index)}>
                <Trash className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" size="sm" onClick={handleAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default InvoiceDetailsStep;
