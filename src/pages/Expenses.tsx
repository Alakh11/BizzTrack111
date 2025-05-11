import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useExpenses, EXPENSE_CATEGORIES } from "@/hooks/useExpenses";
import AddExpenseForm from "@/components/expenses/AddExpenseForm";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import ExpensesByCategory from "@/components/dashboard/ExpensesByCategory";
import { format, subMonths } from "date-fns";

const Expenses = () => {
  const { expenses = [], isLoading, deleteExpense } = useExpenses();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all",
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  // Filter expenses based on search, category, and date range
  const filteredExpenses = expenses.filter((expense) => {
    // Search filter
    const matchesSearch =
      expense.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category?.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === "all" || expense.category === selectedCategory;

    // Date range filter
    let matchesDateRange = true;
    if (dateRange?.from && dateRange?.to) {
      const expenseDate = new Date(expense.date);
      matchesDateRange =
        expenseDate >= dateRange.from && expenseDate <= dateRange.to;
    }

    return matchesSearch && matchesCategory && matchesDateRange;
  });

  const handleEditExpense = (expense: any) => {
    setExpenseToEdit(expense);
    setIsAddExpenseOpen(true);
  };

  const handleDeleteExpense = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteExpense.mutateAsync(id);
    }
  };

  // Calculate total expenses
  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0,
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Expenses</h1>
            <p className="text-muted-foreground">
              Track and manage your business expenses
            </p>
          </div>
          <Button
            onClick={() => {
              setExpenseToEdit(null);
              setIsAddExpenseOpen(true);
            }}
          >
            Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">
              {formatCurrency(
                filteredExpenses
                  .filter(
                    (e) =>
                      new Date(e.date).getMonth() === new Date().getMonth() &&
                      new Date(e.date).getFullYear() ===
                        new Date().getFullYear(),
                  )
                  .reduce((sum, e) => sum + Number(e.amount), 0),
              )}
            </p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Average Per Month</p>
            <p className="text-2xl font-bold">
              {formatCurrency(
                totalExpenses /
                  (dateRange?.from && dateRange?.to
                    ? Math.max(
                        1,
                        Math.round(
                          (dateRange.to.getTime() - dateRange.from.getTime()) /
                            (30 * 24 * 60 * 60 * 1000),
                        ),
                      )
                    : 1),
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpensesByCategory />

          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
              <CardDescription>Expense trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              {/* For simplicity, just showing a simple summary. In a real app, you might want to add a chart here */}
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => {
                  const date = subMonths(new Date(), i);
                  const monthExpenses = expenses.filter(
                    (e) =>
                      new Date(e.date).getMonth() === date.getMonth() &&
                      new Date(e.date).getFullYear() === date.getFullYear(),
                  );
                  const total = monthExpenses.reduce(
                    (sum, e) => sum + Number(e.amount),
                    0,
                  );

                  return (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {format(date, "MMMM yyyy")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {monthExpenses.length} expenses
                        </p>
                      </div>
                      <p className="font-semibold">{formatCurrency(total)}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
            <CardDescription>
              View and manage your expense records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Input
                  placeholder="Search expenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </span>
              </div>

              <div className="flex gap-2">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {EXPENSE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <DatePickerWithRange
                  dateRange={dateRange}
                  onChange={setDateRange}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Loading expenses...
                      </TableCell>
                    </TableRow>
                  ) : filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>
                          {expense.description || (
                            <span className="text-muted-foreground italic">
                              No description
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(Number(expense.amount))}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditExpense(expense)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteExpense(expense.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No expenses found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddExpenseForm
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        expenseToEdit={expenseToEdit}
      />
    </MainLayout>
  );
};

export default Expenses;
