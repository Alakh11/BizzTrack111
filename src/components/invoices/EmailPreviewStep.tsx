
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface EmailPreviewStepProps {
  form: UseFormReturn<any>;
}

const EmailPreviewStep: React.FC<EmailPreviewStepProps> = ({ form }) => {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [sendCopy, setSendCopy] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const formValues = form.getValues();

  // Initialize email content when component mounts
  React.useEffect(() => {
    setEmailSubject(`Invoice #${formValues.invoiceNumber} from ${formValues.businessName}`);
    setEmailMessage(
      `Dear ${formValues.clientName},\n\nPlease find attached invoice #${formValues.invoiceNumber} for your recent purchase.\n\nIf you have any questions, please don't hesitate to contact us.\n\nThank you for your business.\n\nBest regards,\n${formValues.businessName}`
    );
  }, [formValues.invoiceNumber, formValues.businessName, formValues.clientName]);

  const renderInvoicePreview = () => {
    // Get design settings from form
    const template = formValues.selectedTemplate || "standard";
    const color = formValues.selectedColor || "blue";
    const font = formValues.selectedFont || "inter";
    const signature = formValues.signature || "";
    const logo = formValues.businessLogo || "";
    const customTitle = formValues.customInvoiceTitle || "INVOICE";
    
    return (
      <div className="border p-4 rounded-md my-6 bg-white">
        <div className="flex justify-between items-start mb-6">
          {logo && (
            <img 
              src={logo} 
              alt="Business Logo" 
              className="h-16 max-w-[150px] object-contain" 
            />
          )}
          <div className={logo ? "text-right" : "w-full"}>
            <h2 
              className="text-xl font-bold" 
              style={{ color: color }}
            >
              {customTitle}
            </h2>
            {formValues.customSubtitle && <p className="text-sm">{formValues.customSubtitle}</p>}
            <p className="text-sm text-muted-foreground">#{formValues.invoiceNumber}</p>
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
              <td className="text-right pt-4 font-medium">{formValues.total || form.getValues("totalAmount")}</td>
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
        
        {signature && (
          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-muted-foreground mb-1">Signature:</p>
            <img src={signature} alt="Signature" className="max-h-16" />
          </div>
        )}
      </div>
    );
  };

  const handleSendEmail = () => {
    setIsSending(true);
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Email Sent",
        description: `Invoice email has been sent to ${formValues.clientEmail}`,
      });
    }, 1500);
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
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Message</label>
                <textarea
                  className="w-full p-2 border rounded min-h-[150px]"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="send-copy" 
                  className="rounded" 
                  checked={sendCopy}
                  onChange={(e) => setSendCopy(e.target.checked)}
                />
                <label htmlFor="send-copy" className="text-sm">Send me a copy</label>
              </div>
              
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => setPreviewOpen(true)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Email
                </Button>
                <Button 
                  className="w-full"
                  onClick={handleSendEmail}
                  disabled={isSending || !formValues.clientEmail}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {isSending ? "Sending..." : "Send Email"}
                </Button>
              </div>
              
              {!formValues.clientEmail && (
                <p className="text-sm text-red-500">
                  Client email address is required to send the invoice via email
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Invoice Preview</h3>
          {renderInvoicePreview()}
        </div>
      </div>
      
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border rounded-md p-4">
              <p><strong>To:</strong> {formValues.clientEmail || "(Client email not provided)"}</p>
              {sendCopy && <p><strong>CC:</strong> {formValues.businessEmail}</p>}
              <p><strong>Subject:</strong> {emailSubject}</p>
              <div className="mt-4 pt-4 border-t">
                <pre className="whitespace-pre-wrap font-sans text-sm">{emailMessage}</pre>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Invoice will be attached as a PDF file.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>Close</Button>
            <Button onClick={handleSendEmail} disabled={isSending || !formValues.clientEmail}>
              <Mail className="mr-2 h-4 w-4" />
              {isSending ? "Sending..." : "Send Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailPreviewStep;
