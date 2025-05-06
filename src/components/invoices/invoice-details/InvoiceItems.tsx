
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";

interface InvoiceItemsProps {
  items: any[];
  handleItemChange: (id: number, field: string, value: any) => void;
  handleAddItem: () => void;
  handleRemoveItem: (id: number) => void;
}

const InvoiceItems = ({
  items,
  handleItemChange,
  handleAddItem,
  handleRemoveItem,
}: InvoiceItemsProps) => {
  // Calculate amount when quantity or rate changes
  const calculateAmount = (quantity: number, rate: number) => {
    return (quantity * rate).toFixed(2);
  };
  
  // Handle quantity change and recalculate amount
  const handleQuantityChange = (id: number, value: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      handleItemChange(id, "quantity", value);
      const amount = calculateAmount(value, item.rate);
      handleItemChange(id, "amount", parseFloat(amount));
    }
  };
  
  // Handle rate change and recalculate amount
  const handleRateChange = (id: number, value: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      handleItemChange(id, "rate", value);
      const amount = calculateAmount(item.quantity, value);
      handleItemChange(id, "amount", parseFloat(amount));
    }
  };

  return (
    <div className="dark:text-gray-100">
      <h3 className="text-lg font-semibold mb-2">Invoice Items</h3>
      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border rounded-md dark:bg-gray-800/50 bg-muted/10">
          <div className="col-span-1 md:col-span-2">
            <Label className="dark:text-gray-200">Description</Label>
            <Input
              className="dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
              value={item.description}
              onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
              placeholder="Item description"
            />
          </div>
          <div>
            <Label className="dark:text-gray-200">Quantity</Label>
            <Input
              className="dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
              placeholder="Quantity"
            />
          </div>
          <div>
            <Label className="dark:text-gray-200">Rate</Label>
            <Input
              className="dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
              type="number"
              value={item.rate}
              onChange={(e) => handleRateChange(item.id, Number(e.target.value))}
              placeholder="Rate"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <Label className="dark:text-gray-200">Amount</Label>
              <Input
                className="dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 bg-muted cursor-not-allowed"
                type="number"
                value={item.amount}
                readOnly
                placeholder="Amount"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveItem(item.id)}
              className="mt-2"
            >
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
  );
};

export default InvoiceItems;
