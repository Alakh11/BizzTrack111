
import { useState, useEffect, useRef } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useTransactions } from "@/hooks/useTransactions";
import MainLayout from "@/components/layout/MainLayout";
import ProductSearch from "@/components/billing/ProductSearch";
import BillingItem from "@/components/billing/BillingItem";
import TransactionForm from "@/components/billing/TransactionForm";
import BillingReceipt from "@/components/billing/BillingReceipt";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/hooks/useProducts";
import { ShoppingCart } from "lucide-react";

type CartItem = {
  product: Product;
  quantity: number;
};

const Billing = () => {
  const { products, isLoading: productsLoading } = useProducts();
  const { generateTransactionNumber, createTransaction } = useTransactions();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionNumber, setTransactionNumber] = useState("");
  const [receiptData, setReceiptData] = useState<{
    items: CartItem[];
    transactionNumber: string;
    totalAmount: number;
    date: Date;
  } | null>(null);

  // Generate transaction number on component mount
  useEffect(() => {
    setTransactionNumber(generateTransactionNumber());
  }, [generateTransactionNumber]);

  const handleAddProduct = (product: Product) => {
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Increment quantity if product is already in cart
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleProductSearch = (query: string) => {
    // This would typically search through products, but we're handling that in the ProductSearch component
  };

  const handleBarcodeScanned = (barcode: string) => {
    const product = products.find((p) => p.barcode === barcode);
    if (product) {
      handleAddProduct(product);
    } else {
      // Show a message that the product wasn't found
      console.log(`Product with barcode ${barcode} not found`);
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCompleteTransaction = async (transactionData: any) => {
    try {
      // Prepare transaction items
      const items = cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        amount: item.product.price * item.quantity,
      }));

      // Create transaction
      await createTransaction.mutateAsync({
        transaction: transactionData,
        items,
      });

      // Set receipt data
      setReceiptData({
        items: cart,
        transactionNumber: transactionData.transaction_number,
        totalAmount: calculateTotal(),
        date: new Date(),
      });

      // Show receipt
      setShowCheckout(false);
      setShowReceipt(true);
    } catch (error) {
      console.error("Error completing transaction:", error);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleNewTransaction = () => {
    // Reset everything
    setCart([]);
    setShowReceipt(false);
    setTransactionNumber(generateTransactionNumber());
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-muted-foreground">
            Create invoices and process payments for your products and services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel - Product search and items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Products</CardTitle>
                <CardDescription>
                  Search for products or scan a barcode to add items to the bill
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductSearch
                  products={products}
                  onSelectProduct={handleAddProduct}
                  onScanBarcode={handleBarcodeScanned}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
                <CardDescription>
                  {cart.length === 0
                    ? "No items added yet"
                    : `${cart.length} ${
                        cart.length === 1 ? "item" : "items"
                      } in bill`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mb-3" />
                    <h3 className="text-lg font-medium">Your cart is empty</h3>
                    <p className="text-sm">
                      Search for products or scan barcodes to add items
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {cart.map((item, index) => (
                      <BillingItem
                        key={`${item.product.id}-${index}`}
                        product={item.product}
                        quantity={item.quantity}
                        onQuantityChange={(quantity) =>
                          handleQuantityChange(index, quantity)
                        }
                        onRemove={() => handleRemoveItem(index)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
              {cart.length > 0 && (
                <CardFooter className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Total</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(calculateTotal())}
                    </p>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    size="lg"
                    disabled={cart.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>

          {/* Right panel - Recent transactions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Transaction Info</CardTitle>
                <CardDescription>
                  Transaction #{transactionNumber}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p>{new Date().toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Items</p>
                  <p>{cart.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(calculateTotal())}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                >
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Checkout Dialog */}
        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent className="sm:max-w-md">
            <TransactionForm
              transactionNumber={transactionNumber}
              totalAmount={calculateTotal()}
              onSubmit={handleCompleteTransaction}
              onCancel={() => setShowCheckout(false)}
              isLoading={createTransaction.isPending}
            />
          </DialogContent>
        </Dialog>

        {/* Receipt Dialog */}
        <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
          <DialogContent className="sm:max-w-xl">
            {receiptData && (
              <BillingReceipt
                items={receiptData.items}
                transactionNumber={receiptData.transactionNumber}
                totalAmount={receiptData.totalAmount}
                date={receiptData.date}
                onPrint={handlePrintReceipt}
                onClose={handleNewTransaction}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Billing;
