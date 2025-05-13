
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/lib/utils";
import { Barcode, X } from "lucide-react";
import BarcodeScanner from "./BarcodeScanner";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  price: number;
  quantity: number;
}

interface ProductSearchProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onScanBarcode?: (barcode: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ 
  products, 
  onSelectProduct,
  onScanBarcode
}) => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showSearch, setShowSearch] = useState(true);
  const [scanningMode, setScanningMode] = useState(false);

  const { toast } = useToast();
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showSearch) return;

    const lowercaseQuery = debouncedQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.sku.toLowerCase().includes(lowercaseQuery) ||
        (product.barcode && product.barcode.includes(lowercaseQuery))
    );
    setFilteredProducts(filtered.slice(0, 10)); // Limit to 10 results for performance
  }, [debouncedQuery, products, showSearch]);

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    setQuery("");
    inputRef.current?.focus();
  };

  const handleBarcodeDetected = (barcode: string) => {
    setScanningMode(false);
    setShowSearch(true);
    
    // Find product by barcode
    const product = products.find(p => p.barcode === barcode);
    
    if (product) {
      onSelectProduct(product);
      toast({
        title: "Product Found",
        description: `Added ${product.name} to cart`,
      });
    } else {
      toast({
        title: "Product Not Found",
        description: `No product found with barcode ${barcode}`,
        variant: "destructive",
      });
      
      // Call the parent handler if provided
      if (onScanBarcode) {
        onScanBarcode(barcode);
      }
    }
  };

  return (
    <div>
      {showSearch ? (
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products by name, SKU, or barcode"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-4"
              ref={inputRef}
              autoFocus
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => {
                setShowSearch(false);
                setScanningMode(true);
              }}
            >
              <Barcode className="h-4 w-4" />
            </Button>
          </div>
          {query && (
            <div className="border rounded-md max-h-72 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                <ul className="divide-y">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="p-3 hover:bg-muted cursor-pointer flex justify-between items-center"
                      onClick={() => handleSelect(product)}
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <div className="text-sm text-muted-foreground flex gap-2">
                          <p>SKU: {product.sku}</p>
                          {product.barcode && <p>Barcode: {product.barcode}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Stock: {product.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-4 text-center text-muted-foreground">
                  No products found
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <BarcodeScanner
            onDetected={handleBarcodeDetected}
            onError={(error) => {
              toast({
                title: "Scanner Error",
                description: error,
                variant: "destructive",
              });
              setScanningMode(false);
              setShowSearch(true);
            }}
            scanning={scanningMode}
            timeout={15} // 15 seconds timeout
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={() => {
              setScanningMode(false);
              setShowSearch(true);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
