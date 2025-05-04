
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
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Invoice Items</h3>
      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="col-span-1">
            <Label>Description</Label>
            <Input
              value={item.description}
              onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
              placeholder="Item description"
            />
          </div>
          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
              placeholder="Quantity"
            />
          </div>
          <div>
            <Label>Rate</Label>
            <Input
              type="number"
              value={item.rate}
              onChange={(e) => handleItemChange(item.id, "rate", Number(e.target.value))}
              placeholder="Rate"
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveItem(item.id)}
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
