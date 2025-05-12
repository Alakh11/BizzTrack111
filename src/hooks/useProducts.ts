
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export interface Product {
  id: string;
  user_id?: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  category: string;
  low_stock_threshold?: number;
  description?: string;
  barcode?: string;
  created_at?: string;
  updated_at?: string;
}

export const PRODUCT_CATEGORIES = [
  "Grocery",
  "Stationery",
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Health & Beauty",
  "Toys & Games",
  "Others",
];

// Utility functions for products
const generateBarcode = () => {
  const prefix = "PRD";
  const randomDigits = Math.floor(10000000000 + Math.random() * 90000000000);
  return `${prefix}${randomDigits}`;
};

// Main hook function that should only be used within components wrapped with QueryClientProvider
export const useProducts = () => {
  // Check if we're in a browser environment before using hooks
  if (typeof window === 'undefined') {
    // Return a placeholder when not in browser (SSR)
    return {
      products: [],
      isLoading: false,
      createProduct: { mutate: () => {}, mutateAsync: async () => ({}) },
      updateProduct: { mutate: () => {}, mutateAsync: async () => ({}) },
      deleteProduct: { mutate: () => {}, mutateAsync: async () => ({}) },
      filterByCategory: () => [],
      searchProducts: () => [],
      getLowStockProducts: () => [],
    };
  }

  // Only use hooks when in browser environment
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query to fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return [];
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", session.user.id)
        .order("name", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  // Mutation to create a new product
  const createProduct = useMutation({
    mutationFn: async (newProduct: Omit<Product, "id" | "user_id">) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to create a product");
      }

      // Generate barcode if not provided
      const productWithBarcode = {
        ...newProduct,
        user_id: session.user.id,
        barcode: newProduct.barcode || generateBarcode(),
      };

      const { data, error } = await supabase
        .from("products")
        .insert(productWithBarcode)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Success",
        description: "Product created successfully",
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

  // Mutation to update an existing product
  const updateProduct = useMutation({
    mutationFn: async (product: Product) => {
      if (!product.id) {
        throw new Error("Product ID is required for update");
      }

      const { data, error } = await supabase
        .from("products")
        .update({
          name: product.name,
          sku: product.sku,
          price: product.price,
          quantity: product.quantity,
          category: product.category,
          low_stock_threshold: product.low_stock_threshold,
          description: product.description,
          barcode: product.barcode,
          updated_at: new Date().toISOString(),
        })
        .eq("id", product.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Success",
        description: "Product updated successfully",
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

  // Mutation to delete a product
  const deleteProduct = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;
      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Success",
        description: "Product deleted successfully",
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

  // Filter products by category
  const filterByCategory = (category: string) => {
    return products.filter((product) => product.category === category);
  };

  // Search products by name or SKU
  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.sku.toLowerCase().includes(lowercaseQuery),
    );
  };

  // Get low stock products
  const getLowStockProducts = () => {
    return products.filter((product) => {
      const threshold = product.low_stock_threshold || 10;
      return product.quantity < threshold;
    });
  };

  return {
    products,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    filterByCategory,
    searchProducts,
    getLowStockProducts,
  };
};
