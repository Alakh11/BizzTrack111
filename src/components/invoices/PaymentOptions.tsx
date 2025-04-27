
import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { BanknotesIcon, CreditCard } from "lucide-react";

interface PaymentOptionsProps {
  form: any;
}

const PaymentOptions = ({ form }: PaymentOptionsProps) => {
  const [showQrCode, setShowQrCode] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium font-playfair">Payment Options</h3>
      
      <Tabs defaultValue="bank" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="bank" className="flex items-center gap-2">
            <BanknotesIcon className="h-4 w-4" /> Bank Account
          </TabsTrigger>
          <TabsTrigger value="upi" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> UPI Payment
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bank" className="pt-4 space-y-4">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter bank name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter account number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifscCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter IFSC code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter account holder name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="swiftCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SWIFT Code (for international transfers)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter SWIFT code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
        
        <TabsContent value="upi" className="pt-4 space-y-4">
          <FormField
            control={form.control}
            name="upiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPI ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter UPI ID (e.g., name@upi)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2 pt-4">
            <Switch 
              id="qrcode" 
              checked={showQrCode}
              onCheckedChange={setShowQrCode}
            />
            <label htmlFor="qrcode" className="text-sm">
              Show QR code on invoice
            </label>
          </div>
          
          {showQrCode && (
            <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground mb-2">QR Code Preview (will be generated on invoice)</p>
              <div className="w-32 h-32 bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">QR Code</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Scan to pay via any UPI app</p>
            </div>
          )}
          
          <FormField
            control={form.control}
            name="upiDisplayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name to display with UPI ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentOptions;
