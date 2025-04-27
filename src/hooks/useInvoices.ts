import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export const useInvoices = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return [];
      }

      const { data, error } = await supabase
        .from("invoices")
        .select("*, client:clients(name), invoice_items(*)")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const createInvoice = useMutation({
    mutationFn: async (newInvoice: any) => {
      // Get current user ID
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to create an invoice");
      }

      // Add user_id to the invoice
      const invoiceWithUserId = {
        ...newInvoice,
        user_id: session.user.id,
      };

      const { data, error } = await supabase
        .from("invoices")
        .insert(invoiceWithUserId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update invoice
  const updateInvoice = useMutation({
    mutationFn: async ({
      id,
      invoiceData,
    }: {
      id: string;
      invoiceData: any;
    }) => {
      const { error } = await supabase
        .from("invoices")
        .update(invoiceData)
        .eq("id", id);

      if (error) throw error;

      // If there are invoice items to update
      if (invoiceData.invoice_items && invoiceData.invoice_items.length > 0) {
        // First delete existing invoice items
        await supabase.from("invoice_items").delete().eq("invoice_id", id);

        // Then insert the new ones
        const items = invoiceData.invoice_items.map((item: any) => ({
          ...item,
          invoice_id: id,
        }));

        const { error: itemsError } = await supabase
          .from("invoice_items")
          .insert(items);

        if (itemsError) throw itemsError;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast({
        title: "Success",
        description: "Invoice updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete invoice
  const deleteInvoice = useMutation({
    mutationFn: async (invoiceId: string) => {
      // First delete related invoice items
      await supabase.from("invoice_items").delete().eq("invoice_id", invoiceId);

      // Then delete the invoice
      const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", invoiceId);

      if (error) throw error;

      return invoiceId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast({
        title: "Success",
        description: "Invoice deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Get single invoice
  const getInvoice = async (id: string) => {
    const { data, error } = await supabase
      .from("invoices")
      .select(
        "*, client:clients(name, address, email, phone), invoice_items(*)",
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  };

  return {
    invoices,
    isLoading,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
  };
};
