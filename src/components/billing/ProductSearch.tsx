
import React, { useState, useEffect } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Update filtered products when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.sku.toLowerCase().includes(lowercaseQuery) || 
      (product.barcode && product.barcode.toLowerCase().includes(lowercaseQuery))
    );
    
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSelectProduct = (product: Product) => {
    onSelectProduct(product);
    setSearchQuery("");
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
          <CommandInput 
            placeholder="Search products by name, SKU or barcode..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup heading="Products">
              {filteredProducts.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleSelectProduct(product)}
                  className="flex justify-between"
                  disabled={product.quantity === 0}
                >
                  <div>
                    <span className="font-medium">{product.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({product.sku})
                    </span>
                    {product.quantity === 0 && (
                      <span className="ml-2 text-xs text-red-500">OUT OF STOCK</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{formatCurrency(product.price)}</span>
                    <span className={`text-xs ${product.quantity <= (product.low_stock_threshold || 10) ? 'text-amber-500' : 'text-muted-foreground'}`}>
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
