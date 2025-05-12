
import React, { useState } from "react";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Barcode, Search } from "lucide-react";
import { Product } from "@/hooks/useProducts";
import { formatCurrency } from "@/lib/utils";
import BarcodeScanner from "./BarcodeScanner";

interface ProductSearchProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onScanBarcode: (barcode: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  products,
  onSelectProduct,
  onScanBarcode,
}) => {
  const [open, setOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleSelectProduct = (product: Product) => {
    onSelectProduct(product);
    setOpen(false);
  };

  const handleScan = (barcode: string) => {
    onScanBarcode(barcode);
    setShowScanner(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          className="w-full sm:w-auto justify-start"
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Search products...
        </Button>

        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => setShowScanner(true)}
        >
          <Barcode className="mr-2 h-4 w-4" />
          Scan Barcode
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search products by name or SKU..." />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup heading="Products">
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleSelectProduct(product)}
                  className="flex justify-between"
                >
                  <div>
                    <span className="font-medium">{product.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({product.sku})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{formatCurrency(product.price)}</span>
                    <span className="text-xs text-muted-foreground">
                      Stock: {product.quantity}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>

      {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
};

export default ProductSearch;
