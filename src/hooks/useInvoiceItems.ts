
import { useState } from "react";

export const useInvoiceItems = () => {
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, rate: 0, amount: 0, serviceId: "" },
  ]);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.amount, 0);
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate amount if quantity or rate changes
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }

          return updatedItem;
        }
        return item;
      }),
    );
  };

  const handleAddItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([
      ...items,
      {
        id: newId,
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        serviceId: "",
      },
    ]);
  };

  const handleRemoveItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return {
    items,
    setItems,
    calculateTotal,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
  };
};
