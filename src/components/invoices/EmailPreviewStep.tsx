
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useInvoices } from "@/hooks/useInvoices";

interface EmailPreviewStepProps {
  form: UseFormReturn<any>;
}

const EmailPreviewStep: React.FC<EmailPreviewStepProps> = ({ form }) => {
  const formValues = form.getValues();

  const renderInvoicePreview = () => {
    return (
      <div className="border p-4 rounded-md my-6 bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold">{formValues.customInvoiceTitle || "INVOICE"}</h2>
            {formValues.customSubtitle && <p className="text-sm">{formValues.customSubtitle}</p>}
            <p className="text-sm text-muted-foreground">#{formValues.invoiceNumber}</p>
          </div>
          
          <div className="text-right">
            <p><strong>Date:</strong> {formValues.invoiceDate}</p>
            <p><strong>Due Date:</strong> {formValues.dueDate}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-medium">{formValues.businessName}</p>
            <p className="text-sm">{formValues.businessAddress}</p>
          </div>
          
          <div>
            <p className="font-medium">Bill To:</p>
            <p>{formValues.clientName}</p>
            <p className="text-sm">{formValues.clientAddress}</p>
          </div>
        </div>
        
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2">Qty</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {form.getValues("items")?.map((item: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.description}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">{item.rate}</td>
                <td className="text-right py-2">{item.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-right pt-4 font-medium">Total:</td>
              <td className="text-right pt-4 font-medium">{formValues.total}</td>
            </tr>
          </tfoot>
        </table>
        
        <div className="border-t pt-4 mb-4">
          <p><strong>Notes:</strong></p>
          <p>{formValues.notes}</p>
        </div>
        
        <div className="border-t pt-4">
          <p><strong>Terms and Conditions:</strong></p>
          <p>{formValues.terms}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Email Settings</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Subject</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  defaultValue={`Invoice #${formValues.invoiceNumber} from ${formValues.businessName}`}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Message</label>
                <textarea
                  className="w-full p-2 border rounded min-h-[150px]"
                  defaultValue={`Dear ${formValues.clientName},\n\nPlease find attached invoice #${formValues.invoiceNumber} for your recent purchase.\n\nIf you have any questions, please don't hesitate to contact us.\n\nThank you for your business.\n\nBest regards,\n${formValues.businessName}`}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="send-copy" className="rounded" defaultChecked />
                <label htmlFor="send-copy" className="text-sm">Send me a copy</label>
              </div>
              
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Preview Email
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Invoice Preview</h3>
          {renderInvoicePreview()}
        </div>
      </div>
    </div>
  );
};

export default EmailPreviewStep;
