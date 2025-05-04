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
