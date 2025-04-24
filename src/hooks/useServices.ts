
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useServices = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*');

      if (error) throw error;
      return data;
    },
  });

  const createService = useMutation({
    mutationFn: async (newService: any) => {
      const { data, error } = await supabase
        .from('services')
        .insert(newService)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: "Success",
        description: "Service created successfully",
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
    services,
    isLoading,
    createService,
  };
};
