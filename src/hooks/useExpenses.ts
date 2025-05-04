
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export interface Expense {
  id: string;
  user_id?: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}

export const EXPENSE_CATEGORIES = [
  "Rent/Office",
  "Marketing",
  "Salaries",
  "Equipment",
  "Utilities",
  "Travel",
  "Miscellaneous"
];

export const useExpenses = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchExpenses = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return [];
    }

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", session.user.id)
      .order("date", { ascending: false });

    if (error) throw error;
    return data || [];
  };

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const createExpense = useMutation({
    mutationFn: async (newExpense: Omit<Expense, 'id' | 'user_id'>) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to create an expense");
      }

      const expenseWithUserId = {
        ...newExpense,
        user_id: session.user.id,
      };

      const { data, error } = await supabase
        .from("expenses")
        .insert(expenseWithUserId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast({
        title: "Success",
        description: "Expense created successfully",
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

  const updateExpense = useMutation({
    mutationFn: async (expense: Expense) => {
      if (!expense.id) {
        throw new Error("Expense ID is required for update");
      }

      const { data, error } = await supabase
        .from("expenses")
        .update({
          amount: expense.amount,
          category: expense.category,
          description: expense.description,
          date: expense.date,
          updated_at: new Date().toISOString(),
        })
        .eq("id", expense.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast({
        title: "Success",
        description: "Expense updated successfully",
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

  const deleteExpense = useMutation({
    mutationFn: async (expenseId: string) => {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", expenseId);

      if (error) throw error;
      return expenseId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast({
        title: "Success",
        description: "Expense deleted successfully",
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

  // Monthly expense summary
  const getMonthlyExpenses = () => {
    const monthlyData: Record<string, number> = {};
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (monthlyData[monthYear]) {
        monthlyData[monthYear] += Number(expense.amount);
      } else {
        monthlyData[monthYear] = Number(expense.amount);
      }
    });
    
    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount
    }));
  };

  // Filter expenses by date range
  const filterExpensesByDateRange = (startDate: Date, endDate: Date) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  };

  // Filter expenses by category
  const filterExpensesByCategory = (category: string) => {
    return expenses.filter(expense => expense.category === category);
  };

  return {
    expenses,
    isLoading,
    createExpense,
    updateExpense,
    deleteExpense,
    getMonthlyExpenses,
    filterExpensesByDateRange,
    filterExpensesByCategory
  };
};
