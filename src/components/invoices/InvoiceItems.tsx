
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IndianRupee, Plus, Trash } from "lucide-react";

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  serviceId?: string;
}

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onItemChange: (id: number, field: string, value: any) => void;
  onAddItem: () => void;
  onRemoveItem: (id: number) => void;
}

const InvoiceItems: React.FC<InvoiceItemsProps> = ({
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium font-playfair">Invoice Items</h3>
        <Button type="button" variant="outline" size="sm" onClick={onAddItem}>
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
              <th className="text-right py-2 px-2 font-medium">Amount (₹)</th>
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
                      onItemChange(item.id, "description", e.target.value)
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
                      onItemChange(
                        item.id,
                        "quantity",
                        parseInt(e.target.value) || 0,
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
                        onItemChange(
                          item.id,
                          "rate",
                          parseFloat(e.target.value) || 0,
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
                    onClick={() => onRemoveItem(item.id)}
                    disabled={items.length === 1}
                  >
                    <Trash className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}></td>
              <td className="text-right py-4 px-2 font-medium">Total:</td>
              <td className="text-right py-4 px-2 font-medium">
                <div className="flex items-center justify-end">
                  <IndianRupee className="h-3 w-3 mr-1" />
                  {items
                    .reduce((sum, item) => sum + item.amount, 0)
                    .toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </div>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default InvoiceItems;
