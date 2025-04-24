
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useInvoices = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('*, client:clients(name), invoice_items(*)');

      if (error) throw error;
      return data;
    },
  });

  const createInvoice = useMutation({
    mutationFn: async (newInvoice: any) => {
      const { data, error } = await supabase
        .from('invoices')
        .insert(newInvoice)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
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

  return {
    invoices,
    isLoading,
    createInvoice,
  };
};
