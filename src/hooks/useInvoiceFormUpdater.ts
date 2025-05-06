
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useInvoiceFormUpdater = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle invoice creation
  const createInvoice = async (invoiceData: any, invoiceItems: any[]) => {
    try {
      // Check for unique invoice number first
      const { data: existingInvoices } = await supabase
        .from("invoices")
        .select("id")
        .eq("invoice_number", invoiceData.invoice_number)
        .limit(1);
        
      if (existingInvoices && existingInvoices.length > 0) {
        toast({
          title: "Duplicate Invoice Number",
          description: "This invoice number already exists. Please use a unique number.",
          variant: "destructive",
        });
        return null;
      }
      
      // Create new invoice
      const { data: result, error } = await supabase
        .from("invoices")
        .insert(invoiceData)
        .select()
        .single();

      if (error) throw error;

      // If invoice was created successfully, add invoice items
      if (result && result.id) {
        // Insert invoice items
        const { error: itemsError } = await supabase
          .from("invoice_items")
          .insert(
            invoiceItems.map((item) => ({
              ...item,
              invoice_id: result.id,
            }))
          );

        if (itemsError) throw itemsError;

        toast({
          title: "Invoice created",
          description: "Your invoice has been created successfully.",
        });
        
        return result;
      }
      return null;
    } catch (error: any) {
      console.error("Error creating invoice:", error);
      toast({
        title: "Error creating invoice",
        description: error.message || "An error occurred while creating the invoice",
        variant: "destructive",
      });
      return null;
    }
  };

  // Handle invoice update
  const updateInvoice = async (invoiceId: string, invoiceData: any, invoiceItems: any[]) => {
    try {
      // Update invoice data
      const { error } = await supabase
        .from("invoices")
        .update(invoiceData)
        .eq("id", invoiceId);

      if (error) throw error;

      // First delete existing invoice items
      const { error: deleteError } = await supabase
        .from("invoice_items")
        .delete()
        .eq("invoice_id", invoiceId);

      if (deleteError) throw deleteError;

      // Then insert new invoice items
      if (invoiceItems.length > 0) {
        const { error: itemsError } = await supabase
          .from("invoice_items")
          .insert(
            invoiceItems.map((item) => ({
              ...item,
              invoice_id: invoiceId,
            }))
          );

        if (itemsError) throw itemsError;
      }

      toast({
        title: "Invoice updated",
        description: "Your invoice has been updated successfully.",
      });
      
      return invoiceId;
    } catch (error: any) {
      console.error("Error updating invoice:", error);
      toast({
        title: "Error updating invoice",
        description: error.message || "An error occurred while updating the invoice",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    createInvoice,
    updateInvoice,
    navigate
  };
};
