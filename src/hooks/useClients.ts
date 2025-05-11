
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export const useClients = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return [];
      }

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const createClient = useMutation({
    mutationFn: async (newClient: any) => {
      // Get current user ID
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to create a client");
      }

      // Add user_id to the client
      const clientWithUserId = {
        ...newClient,
        user_id: session.user.id,
      };

      const { data, error } = await supabase
        .from("clients")
        .insert(clientWithUserId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Success",
        description: "Client created successfully",
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

  // Update client
  const updateClient = useMutation({
    mutationFn: async ({ id, clientData }: { id: string; clientData: any }) => {
      const { error } = await supabase
        .from("clients")
        .update(clientData)
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Success",
        description: "Client updated successfully",
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

  // Delete client
  const deleteClient = useMutation({
    mutationFn: async (clientId: string) => {
      const { error } = await supabase.from("clients").delete().eq("id", clientId);

      if (error) throw error;
      return clientId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Success",
        description: "Client deleted successfully",
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
    clients,
    isLoading,
    createClient,
    updateClient,
    deleteClient,
  };
};
