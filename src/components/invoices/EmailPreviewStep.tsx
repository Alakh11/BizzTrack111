import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Download, Mail, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InvoicePrintRenderer from "./InvoicePrintRenderer";
import { useEmailSender } from "@/hooks/useEmailSender";
import { Invoice } from "@/types/invoice";

interface EmailPreviewStepProps {
  form: UseFormReturn<any>;
}

const EmailPreviewStep: React.FC<EmailPreviewStepProps> = ({ form }) => {
  const [activeTab, setActiveTab] = useState<string>("preview");
  const { toast } = useToast();
  const { sendEmail } = useEmailSender();
  const [isSending, setIsSending] = useState(false);

  // Prepare invoice data from form
  const getInvoiceData = () => {
    const formData = form.getValues();

    // Calculate total amount
    let totalAmount = 0;
    if (formData.items && Array.isArray(formData.items)) {
      totalAmount = formData.items.reduce(
        (sum: number, item: any) => sum + (parseFloat(item.amount) || 0),
        0,
      );
    }

    // Create a valid invoice object that matches the Invoice interface
    const invoice: Invoice = {
      id: formData.id || "preview-invoice",
      user_id: formData.user_id || "preview-user",
      client_id: formData.clientId || null,
      invoice_number: formData.invoiceNumber,
      invoice_date: formData.invoiceDate,
      due_date: formData.dueDate,
      total_amount: totalAmount,
      status: formData.status || "draft",
      notes: formData.notes,
      terms: formData.terms,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      client: {
        name: formData.clientName,
        address: formData.clientAddress,
        email: formData.clientEmail,
        phone: formData.clientPhone,
      },
      invoice_items: formData.items || [],
      metadata: {
        businessName: formData.businessName,
        businessAddress: formData.businessAddress,
        businessEmail: formData.businessEmail,
        businessPhone: formData.businessPhone,
        design: {
          template: form.getValues("template") || "standard",
          color: form.getValues("color") || "blue",
          font: form.getValues("font") || "inter",
          paperSize: form.getValues("paperSize") || "a4",
          title: form.getValues("invoiceTitle") || "INVOICE",
          logo: form.getValues("logo") || "",
          signature: form.getValues("signature") || "",
          watermarkText: form.getValues("watermarkText") || "",
        },
        payment: {
          bank: {
            name: formData.bankName,
            accountNumber: formData.accountNumber,
            ifscCode: formData.ifscCode,
            accountHolderName: formData.accountHolderName,
            branchName: formData.branchName,
          },
          upi: {
            id: formData.upiId,
            name: formData.upiName,
          },
        },
      },
    };

    return invoice;
  };

  // Handle preview actions
  const handleViewInvoice = () => {
    const invoiceData = getInvoiceData();
    InvoicePrintRenderer.previewInvoice(invoiceData);
  };

  const handlePrintInvoice = () => {
    const invoiceData = getInvoiceData();
    InvoicePrintRenderer.printInvoice(invoiceData);
  };

  const handleDownloadInvoice = () => {
    const invoiceData = getInvoiceData();
    InvoicePrintRenderer.downloadInvoice(invoiceData);
  };

  const handleSendEmail = async () => {
    const clientEmail = form.getValues("clientEmail");
    const clientName = form.getValues("clientName");
    const emailSubject = form.getValues("emailSubject");
    const emailBody = form.getValues("emailBody");
    const invoiceId = form.getValues("id"); // In case of edit mode

    if (!clientEmail) {
      toast({
        title: "Missing Email Address",
        description: "Client email address is required to send the invoice.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      await sendEmail({
        to: clientEmail,
        subject: emailSubject || `Invoice #${form.getValues("invoiceNumber")}`,
        content: emailBody || "Please find attached your invoice.",
        recipientName: clientName,
        invoiceId: invoiceId,
        // Attachments would be handled by the email service
      });

      toast({
        title: "Success",
        description: `Invoice email sent to ${clientName || clientEmail}!`,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Email Failed",
        description: "There was a problem sending the email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Email Details</h3>

          <FormField
            control={form.control}
            name="emailTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue={form.getValues("clientEmail")}
                    placeholder="Client email address"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailSubject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue={`Invoice #${form.getValues("invoiceNumber")}`}
                    placeholder="Email subject"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailBody"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <textarea
                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    rows={5}
                    {...field}
                    defaultValue={`Dear ${form.getValues("clientName") || "Client"},\n\nPlease find attached your invoice #${form.getValues("invoiceNumber")} due on ${new Date(form.getValues("dueDate")).toLocaleDateString()}.\n\nThank you for your business.\n\nRegards,\n${form.getValues("businessName") || "Alakh Corporation"}`}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={handleSendEmail}
              disabled={isSending}
            >
              <Mail className="mr-2 h-4 w-4" />
              {isSending ? "Sending..." : "Send Email"}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="preview">Invoice Preview</TabsTrigger>
              <TabsTrigger value="actions">Invoice Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              <div className="border rounded-md p-4 h-96 overflow-auto bg-gray-50">
                <div className="flex justify-center items-center h-full flex-col">
                  <p className="text-center text-muted-foreground mb-4">
                    Click the button below to preview your invoice in a new tab
                  </p>
                  <Button onClick={handleViewInvoice}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Invoice
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <Button
                    onClick={handlePrintInvoice}
                    variant="outline"
                    className="w-full"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Invoice
                  </Button>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Send the invoice directly to your printer
                  </p>
                </Card>

                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <Button
                    onClick={handleDownloadInvoice}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Invoice
                  </Button>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Save the invoice as an HTML file
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default EmailPreviewStep;
