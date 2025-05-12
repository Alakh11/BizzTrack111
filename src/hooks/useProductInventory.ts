
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { Product } from "./useProducts";

export const useProductInventory = () => {
  // Check if we're in a browser environment before using hooks
  if (typeof window === 'undefined') {
    // Return a placeholder when not in browser (SSR)
    return {
      updateStock: { mutate: () => {}, mutateAsync: async () => ({}) },
    };
  }

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Update product stock (add or remove)
  const updateStock = useMutation({
    mutationFn: async ({
      productId,
      quantity,
      type = "remove",
    }: {
      productId: string;
      quantity: number;
      type?: "add" | "remove";
    }) => {
      // Get current product
      const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (fetchError) throw fetchError;

      // Calculate new quantity
      const newQuantity =
        type === "add"
          ? product.quantity + quantity
          : product.quantity - quantity;

      // Validate quantity
      if (newQuantity < 0) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      // Update product
      const { data, error } = await supabase
        .from("products")
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq("id", productId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Stock Updated",
        description: "Product inventory has been updated successfully",
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
    updateStock,
  };
};
