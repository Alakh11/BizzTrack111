
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import PaymentOptionsForm from "@/components/invoices/PaymentOptionsForm";

interface BankingDetailsStepProps {
  form: any;
}

const BankingDetailsStep: React.FC<BankingDetailsStepProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <PaymentOptionsForm form={form} />

      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-medium font-playfair">
          Additional Information
        </h3>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (visible to client)</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  rows={5}
                  {...field}
                  placeholder="Enter any notes for the client"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terms and Conditions</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  rows={5}
                  {...field}
                  placeholder="Enter terms and conditions"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BankingDetailsStep;
