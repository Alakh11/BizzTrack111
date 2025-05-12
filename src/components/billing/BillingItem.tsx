
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Product } from "@/hooks/useProducts";
import { formatCurrency } from "@/lib/utils";

interface BillingItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

const BillingItem: React.FC<BillingItemProps> = ({
  product,
  quantity,
  onQuantityChange,
  onRemove,
}) => {
  const totalPrice = product.price * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    onQuantityChange(newQuantity > 0 ? newQuantity : 1);
  };

  const incrementQuantity = () => {
    onQuantityChange(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-3 border-b">
      <div className="w-full sm:w-1/3">
        <p className="font-medium">{product.name}</p>
        <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
      </div>

      <div className="flex items-center gap-1 w-full sm:w-1/4">
        <Button type="button" variant="outline" size="sm" onClick={decrementQuantity}>
          -
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center"
        />
        <Button type="button" variant="outline" size="sm" onClick={incrementQuantity}>
          +
        </Button>
        <span className="text-xs text-muted-foreground ml-2">
          (Stock: {product.quantity})
        </span>
      </div>

      <div className="flex items-center justify-between w-full sm:w-1/3">
        <div>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(product.price)} × {quantity}
          </p>
          <p className="font-medium">{formatCurrency(totalPrice)}</p>
        </div>

        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BillingItem;
