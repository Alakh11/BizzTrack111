
import { useToast } from "./use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SendEmailProps {
  to: string;
  subject: string;
  content: string;
  recipientName?: string;
  invoiceId?: string;
  attachments?: any[];
}

export const useEmailSender = () => {
  const { toast } = useToast();

  const sendEmail = async ({
    to,
    subject,
    content,
    recipientName,
    invoiceId,
    attachments,
  }: SendEmailProps) => {
    try {
      // For now, just simulate sending an email
      toast({
        title: "Email Sent",
        description: `Email sent to ${to} successfully!`,
      });
      
      // In a real application, you would call your email API here
      // For example:
      // const { data, error } = await supabase.functions.invoke('send-invoice-email', {
      //   body: { to, subject, content, recipientName, invoiceId, attachments }
      // });
      
      // Just mock the response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If there was an invoice ID, we might want to update its status
      if (invoiceId) {
        const { error } = await supabase
          .from("invoices")
          .update({ status: "sent", updated_at: new Date().toISOString() })
          .eq("id", invoiceId);
          
        if (error) throw error;
      }

      return { success: true };
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send email",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return { sendEmail };
};
