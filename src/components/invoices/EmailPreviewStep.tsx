
import { useState } from "react";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEmailSender } from "@/hooks/useEmailSender";

const EmailPreviewStep = () => {
  const { 
    form, 
    clients, 
    invoiceId, 
    calculateTotal 
  } = useInvoiceForm();

  const { sendEmail } = useEmailSender();
  const [isSending, setIsSending] = useState(false);
  const [sendCopy, setSendCopy] = useState(true);

  const formValues = form.getValues();
  const clientId = formValues.clientId;
  const client = clients.find((c) => c.id === clientId);
  
  const [emailSubject, setEmailSubject] = useState(
    `Invoice #${formValues.invoiceNumber} from ${formValues.businessName}`
  );
  
  const [emailBody, setEmailBody] = useState(
    `Dear ${client?.name || 'Client'},\n\nPlease find attached your invoice #${formValues.invoiceNumber} for a total amount of ₹${calculateTotal().toLocaleString('en-IN')}.\n\nPayment is due by ${formValues.dueDate}.\n\nThank you for your business.\n\nSincerely,\n${formValues.businessName}`
  );

  const handleSendEmail = async () => {
    if (!client?.email) {
      alert("Client email address is missing.");
      return;
    }

    setIsSending(true);
    try {
      await sendEmail({
        to: client.email,
        subject: emailSubject,
        content: emailBody,
        recipientName: client.name,
        invoiceId,
      });
      
      // If send copy is checked, also send to the business email
      if (sendCopy && formValues.businessEmail) {
        await sendEmail({
          to: formValues.businessEmail,
          subject: `Copy: ${emailSubject}`,
          content: emailBody,
          recipientName: formValues.businessName,
          invoiceId,
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Email Invoice</h3>
      <p className="text-muted-foreground">
        Preview and send your invoice via email
      </p>
      
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="recipient">Recipient</Label>
          <Input 
            id="recipient" 
            value={`${client?.name || 'Client'} <${client?.email || 'No email available'}>` } 
            disabled
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input 
            id="subject" 
            value={emailSubject} 
            onChange={(e) => setEmailSubject(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="emailBody">Email Body</Label>
          <Textarea 
            id="emailBody" 
            rows={10}
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            className="resize-none"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="sendCopy" 
            checked={sendCopy}
            onCheckedChange={setSendCopy}
          />
          <Label htmlFor="sendCopy">
            Send me a copy at {formValues.businessEmail || "your business email"}
          </Label>
        </div>
        
        <Card className="mt-2">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2">Invoice Preview</h4>
            <p className="text-sm text-muted-foreground">
              Invoice #{formValues.invoiceNumber}
              <br />
              Total: ₹{calculateTotal().toLocaleString('en-IN')}
              <br />
              Due date: {formValues.dueDate}
            </p>
          </CardContent>
        </Card>
        
        <Button
          type="button"
          onClick={handleSendEmail}
          disabled={!client?.email || isSending}
          className="w-full"
        >
          {isSending ? "Sending..." : "Send Invoice"}
        </Button>
      </div>
    </div>
  );
};

export default EmailPreviewStep;
