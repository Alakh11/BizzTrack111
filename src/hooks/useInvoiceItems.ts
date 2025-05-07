
import { useState, useCallback } from "react";

export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  serviceId: string;
}

export const useInvoiceItems = () => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: "", quantity: 1, rate: 0, amount: 0, serviceId: "" },
  ]);

  const calculateTotal = useCallback(() => {
    return items.reduce((total, item) => total + Number(item.amount), 0);
  }, [items]);

  const handleItemChange = useCallback((id: number, field: string, value: any) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate amount if quantity or rate changes
          if (field === "quantity" || field === "rate") {
            const newQuantity = field === "quantity" ? Number(value) : Number(item.quantity);
            const newRate = field === "rate" ? Number(value) : Number(item.rate);
            updatedItem.amount = newQuantity * newRate;
          }

          return updatedItem;
        }
        return item;
      }),
    );
  }, []);

  const handleAddItem = useCallback(() => {
    const newId =
      items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems(prevItems => [
      ...prevItems,
      {
        id: newId,
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        serviceId: "",
      },
    ]);
  }, [items]);

  const handleRemoveItem = useCallback((id: number) => {
    if (items.length > 1) {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  }, [items]);

  return {
    items,
    setItems,
    calculateTotal,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
  };
};
