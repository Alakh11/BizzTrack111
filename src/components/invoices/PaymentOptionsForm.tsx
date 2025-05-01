
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Banknote } from "lucide-react";

interface PaymentOptionsFormProps {
  form: any;
}

export const PaymentOptionsForm = ({ form }: PaymentOptionsFormProps) => {
  const [showQrCode, setShowQrCode] = useState(false);
  const [activeTab, setActiveTab] = useState("bank");
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bank" className="flex items-center">
            <Banknote className="h-4 w-4 mr-2" /> Bank Account
          </TabsTrigger>
          <TabsTrigger value="upi" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" /> UPI Payment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bank" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
              <CardDescription>
                Add your bank account details for receiving payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                name="branchName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter branch name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upi" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>UPI Payment Details</CardTitle>
              <CardDescription>
                Add your UPI ID for receiving payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="upiId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UPI ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="username@upi" />
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
                <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                  <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                    <p className="text-xs text-gray-500">QR Preview</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    QR code will be generated on the invoice
                  </p>
                </div>
              )}

              <FormField
                control={form.control}
                name="upiName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name for UPI</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name for UPI" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
