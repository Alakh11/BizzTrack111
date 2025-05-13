
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { Product } from "./useProducts";

export interface TransactionItem {
  id?: string;
  transaction_id?: string;
  product_id: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface Transaction {
  id?: string;
  user_id?: string;
  transaction_number: string;
  date: string;
  total_amount: number;
  payment_method: string;
  status: string;
  notes?: string;
  customer_name?: string;
  customer_mobile?: string;
  transaction_items?: TransactionItem[];
}

export const useTransactions = () => {
  // Check if we're in a browser environment before using hooks
  if (typeof window === 'undefined') {
    // Return a placeholder when not in browser (SSR)
    return {
      transactions: [],
      isLoading: false,
      createTransaction: { 
        mutate: () => {}, 
        mutateAsync: async () => ({}),
        isPending: false 
      },
      saveReceipt: {
        mutate: () => {},
        mutateAsync: async () => ({}),
        isPending: false
      },
      generateTransactionNumber: () => "TXN000000",
      getStoredReceipts: () => [],
      deleteReceipt: { 
        mutate: () => {}, 
        mutateAsync: async () => ({}),
        isPending: false 
      },
    };
  }

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Generate a unique transaction number
  const generateTransactionNumber = () => {
    const prefix = "TXN";
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `${prefix}${timestamp}${random}`;
  };

  // Query to fetch transactions
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return [];
      }

      const { data, error } = await supabase
        .from("transactions")
        .select("*, transaction_items(*, product_id)")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Query to fetch stored receipts
  const { data: storedReceipts = [] } = useQuery({
    queryKey: ["stored_receipts"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return [];
      }

      const { data, error } = await supabase
        .from("stored_receipts")
        .select("*, transactions(*)")
        .eq("user_id", session.user.id)
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Mutation to create a new transaction with items
  const createTransaction = useMutation({
    mutationFn: async ({
      transaction,
      items,
    }: {
      transaction: Omit<Transaction, "id" | "user_id">;
      items: Omit<TransactionItem, "id" | "transaction_id">[];
    }) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to create a transaction");
      }
      
      // First check all product quantities to make sure there's enough stock
      for (const item of items) {
        const { data: product, error: getError } = await supabase
          .from("products")
          .select("quantity, low_stock_threshold, name")
          .eq("id", item.product_id)
          .single();
          
        if (getError) throw getError;
        
        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}. Available: ${product.quantity}`);
        }
      }

      // Create transaction with user_id
      const transactionWithUserId = {
        ...transaction,
        user_id: session.user.id,
        transaction_number: transaction.transaction_number || generateTransactionNumber(),
      };

      // Insert the transaction
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert(transactionWithUserId)
        .select()
        .single();

      if (transactionError) throw transactionError;

      // Prepare items with transaction_id
      const itemsWithTransactionId = items.map(item => ({
        ...item,
        transaction_id: transactionData.id,
      }));

      // Insert the transaction items
      const { data: itemsData, error: itemsError } = await supabase
        .from("transaction_items")
        .insert(itemsWithTransactionId)
        .select();

      if (itemsError) throw itemsError;

      // Update product quantities
      for (const item of items) {
        // First get the current product quantity
        const { data: product, error: getError } = await supabase
          .from("products")
          .select("quantity, low_stock_threshold, name")
          .eq("id", item.product_id)
          .single();
          
        if (getError) throw getError;
        
        // Then update with new calculated quantity
        const newQuantity = product.quantity - item.quantity;
        
        const { error: updateError } = await supabase
          .from("products")
          .update({ quantity: newQuantity })
          .eq("id", item.product_id);

        if (updateError) throw updateError;
        
        // Check if product is now below threshold and show warning
        if (newQuantity <= (product.low_stock_threshold || 10)) {
          toast({
            title: "Low Stock Warning",
            description: `${product.name} is now low on stock (${newQuantity} remaining)`,
            variant: "destructive",
          });
        }
      }

      return { transaction: transactionData, items: itemsData };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Success",
        description: "Transaction completed successfully",
      });
      return data;
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    },
  });

  // Mutation to save a receipt
  const saveReceipt = useMutation({
    mutationFn: async ({
      transactionId,
      receiptData,
    }: {
      transactionId: string;
      receiptData: any;
    }) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to save a receipt");
      }

      const { data, error } = await supabase
        .from("stored_receipts")
        .insert({
          user_id: session.user.id,
          transaction_id: transactionId,
          receipt_data: receiptData,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stored_receipts"] });
      toast({
        title: "Success",
        description: "Receipt saved successfully",
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

  // Mutation to delete a receipt
  const deleteReceipt = useMutation({
    mutationFn: async (receiptId: string) => {
      const { error } = await supabase
        .from("stored_receipts")
        .update({ is_deleted: true })
        .eq("id", receiptId);

      if (error) throw error;
      return receiptId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stored_receipts"] });
      toast({
        title: "Success",
        description: "Receipt deleted successfully",
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
    transactions,
    isLoading,
    createTransaction,
    saveReceipt,
    generateTransactionNumber,
    storedReceipts,
    deleteReceipt,
  };
};
