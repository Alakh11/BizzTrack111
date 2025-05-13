
import { useState, useEffect, useRef } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useTransactions } from "@/hooks/useTransactions";
import MainLayout from "@/components/layout/MainLayout";
import ProductSearch from "@/components/billing/ProductSearch";
import BillingItem from "@/components/billing/BillingItem";
import TransactionForm from "@/components/billing/TransactionForm";
import BillingReceipt from "@/components/billing/BillingReceipt";
import SavedReceipts from "@/components/billing/SavedReceipts";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/hooks/useProducts";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CartItem = {
  product: Product;
  quantity: number;
};

interface StoredReceipt {
  id: string;
  receipt_data: {
    items: CartItem[];
  };
  transactions: {
    transaction_number: string;
    id: string;
    total_amount: number;
    customer_name?: string;
    customer_mobile?: string;
    date?: string;
    payment_method?: string;
  };
  created_at: string;
}

// Define the transaction response type
interface TransactionResponse {
  transaction: {
    id: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const Billing = () => {
  const { products, isLoading: productsLoading } = useProducts();
  const { generateTransactionNumber, createTransaction, saveReceipt } = useTransactions();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("new-transaction");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionNumber, setTransactionNumber] = useState("");
  const [receiptData, setReceiptData] = useState<{
    items: CartItem[];
    transactionNumber: string;
    totalAmount: number;
    date: Date;
    paymentMethod?: string;
    customerName?: string;
    customerMobile?: string;
  } | null>(null);

  // Generate transaction number on component mount
  useEffect(() => {
    setTransactionNumber(generateTransactionNumber());
  }, [generateTransactionNumber]);

  const handleAddProduct = (product: Product) => {
    // Check if there's enough stock
    if (product.quantity <= 0) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is out of stock.`,
        variant: "destructive",
      });
      return;
    }

    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Increment quantity if product is already in cart
      const updatedCart = [...cart];
      const newQuantity = updatedCart[existingItemIndex].quantity + 1;
      
      // Check if the new quantity exceeds the available stock
      if (newQuantity > product.quantity) {
        toast({
          title: "Insufficient Stock",
          description: `Only ${product.quantity} units of ${product.name} available.`,
          variant: "destructive",
        });
        return;
      }
      
      updatedCart[existingItemIndex].quantity = newQuantity;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedCart = [...cart];
    const product = updatedCart[index].product;
    
    // Check if the new quantity exceeds the available stock
    if (quantity > product.quantity) {
      toast({
        title: "Warning",
        description: `Quantity exceeds available stock (${product.quantity}) for ${product.name}`,
        variant: "destructive",
      });
    }
    
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
    // Validate cart
    const invalidItems = cart.filter(item => item.quantity > item.product.quantity);
    if (invalidItems.length > 0) {
      toast({
        title: "Invalid Quantities",
        description: "Some items have quantities exceeding available stock. Please adjust before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add at least one product to the cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    
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

      // Create transaction with explicit type for the result
      const result = await createTransaction.mutateAsync({
        transaction: transactionData,
        items,
      }) as TransactionResponse;

      // Set receipt data
      const newReceiptData = {
        items: cart,
        transactionNumber: transactionData.transaction_number,
        totalAmount: calculateTotal(),
        date: new Date(),
        paymentMethod: transactionData.payment_method,
        customerName: transactionData.customer_name,
        customerMobile: transactionData.customer_mobile,
      };
      
      setReceiptData(newReceiptData);

      // Save receipt in the database
      if (result && result.transaction && result.transaction.id) {
        await saveReceipt.mutateAsync({
          transactionId: result.transaction.id,
          receiptData: newReceiptData,
        });
      } else {
        console.error("Missing transaction ID", result);
      }

      // Show receipt
      setShowCheckout(false);
      setShowReceipt(true);
    } catch (error) {
      console.error("Error completing transaction:", error);
      // Toast already shown by the mutation error handler
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
    setActiveTab("new-transaction");
  };

  const handleBarcodeScanned = (barcode: string) => {
    const product = products.find((p) => p.barcode === barcode);
    if (product) {
      handleAddProduct(product);
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
    }
  };

  const handleEditReceipt = (storedReceipt: StoredReceipt) => {
    // Load receipt data into the current transaction
    if (storedReceipt && storedReceipt.receipt_data) {
      setCart(storedReceipt.receipt_data.items);
      setTransactionNumber(storedReceipt.transactions.transaction_number);
      setActiveTab("new-transaction");
      
      toast({
        title: "Receipt Loaded",
        description: "You can now edit this receipt",
      });
    }
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="new-transaction">New Transaction</TabsTrigger>
            <TabsTrigger value="saved-receipts">Saved Receipts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-transaction">
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

              {/* Right panel - Transaction info */}
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
          </TabsContent>
          
          <TabsContent value="saved-receipts">
            <SavedReceipts onEdit={handleEditReceipt} />
          </TabsContent>
        </Tabs>

        {/* Checkout Dialog */}
        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent className="sm:max-w-xl">
            <TransactionForm
              transactionNumber={transactionNumber}
              totalAmount={calculateTotal()}
              onSubmit={handleCompleteTransaction}
              onCancel={() => setShowCheckout(false)}
              isLoading={createTransaction.isPending || false}
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
                paymentMethod={receiptData.paymentMethod}
                customerName={receiptData.customerName}
                customerMobile={receiptData.customerMobile}
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
