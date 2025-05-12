
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export interface Client {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  user_id?: string;
  company?: string; // Added company field since it's used in the UI
  created_at?: string;
  updated_at?: string;
}

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
<<<<<<< HEAD
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });
=======
        .eq("user_id", session.user.id);

      if (error) throw error;
      return data || [];
    },
  });

  const createClient = useMutation({
<<<<<<< HEAD
    mutationFn: async (newClient: any) => {
      // Get current user ID
=======
    mutationFn: async (newClient: Client) => {
>>>>>>> Bizztrack/main
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to create a client");
      }

<<<<<<< HEAD
      // Add user_id to the client
=======
>>>>>>> Bizztrack/main
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

<<<<<<< HEAD
  // Update client
  const updateClient = useMutation({
    mutationFn: async ({ id, clientData }: { id: string; clientData: any }) => {
      const { error } = await supabase
        .from("clients")
        .update(clientData)
        .eq("id", id);

      if (error) throw error;
      return id;
=======
  const updateClient = useMutation({
    mutationFn: async (client: Client) => {
      if (!client.id) {
        throw new Error("Client ID is required for update");
      }

      const { data, error } = await supabase
        .from("clients")
        .update({
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          updated_at: new Date().toISOString(),
        })
        .eq("id", client.id)
        .select()
        .single();

      if (error) throw error;
      return data;
>>>>>>> Bizztrack/main
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

<<<<<<< HEAD
  // Delete client
  const deleteClient = useMutation({
    mutationFn: async (clientId: string) => {
      const { error } = await supabase.from("clients").delete().eq("id", clientId);
=======
  const deleteClient = useMutation({
    mutationFn: async (clientId: string) => {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", clientId);
>>>>>>> Bizztrack/main

      if (error) throw error;
      return clientId;
    },
<<<<<<< HEAD
    onSuccess: () => {
=======
    onSuccess: (clientId) => {
>>>>>>> Bizztrack/main
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
