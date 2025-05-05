
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface BankingDetailsStepProps {
  form: UseFormReturn<any>;
}

const BankingDetailsStep: React.FC<BankingDetailsStepProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="bank">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              <TabsTrigger value="upi">UPI</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bank" className="space-y-4">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter bank name" />
                    </FormControl>
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
                      <Input {...field} placeholder="Enter account number" />
                    </FormControl>
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
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="upi" className="space-y-4">
              <FormField
                control={form.control}
                name="upiId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UPI ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter UPI ID (e.g., yourname@bank)" />
                    </FormControl>
                    <FormDescription>
                      This will be displayed on the invoice for direct payments
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="upiName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UPI Display Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name to display with UPI ID" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Notes and Terms fields kept for the form to work */}
      <div className="hidden">
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BankingDetailsStep;
