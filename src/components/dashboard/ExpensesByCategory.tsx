
import ChartCard from "./ChartCard";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useExpenses } from "@/hooks/useExpenses";
import { useMemo } from "react";

const COLORS = [
  "#10b981", // Rent/Office
  "#f59e0b", // Marketing
  "#3b82f6", // Salaries
  "#ef4444", // Equipment
  "#8b5cf6", // Utilities
  "#84cc16", // Travel
  "#64748b", // Miscellaneous
];

const ExpensesByCategory = () => {
  const { expenses } = useExpenses();

  const categoryData = useMemo(() => {
    if (!expenses || expenses.length === 0) return [];

    const categories: Record<string, number> = {};
    
    expenses.forEach(expense => {
      const category = expense.category;
      if (categories[category]) {
        categories[category] += Number(expense.amount);
      } else {
        categories[category] = Number(expense.amount);
      }
    });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-primary">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard title="Expenses by Category" description="Distribution of expenses">
      <div className="h-[230px]">
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No expense data available
          </div>
        )}
      </div>
    </ChartCard>
  );
};

export default ExpensesByCategory;
