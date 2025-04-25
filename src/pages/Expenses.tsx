
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Plus, IndianRupee, Calendar } from "lucide-react";
import { useState } from "react";

const Expenses = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  // Sample data - in a real app, this would come from the database
  const recentExpenses = [
    { id: "1", date: "2025-04-20", category: "Office Supplies", description: "Stationery items", amount: 2500 },
    { id: "2", date: "2025-04-18", category: "Utilities", description: "Electricity bill", amount: 3200 },
    { id: "3", date: "2025-04-15", category: "Software", description: "SaaS subscription", amount: 4999 },
    { id: "4", date: "2025-04-10", category: "Travel", description: "Client meeting travel", amount: 1800 },
    { id: "5", date: "2025-04-05", category: "Equipment", description: "Office chair", amount: 7500 },
  ];

  const expenseCategories = [
    { name: "Office Supplies", amount: 12500, color: "bg-blue-500" },
    { name: "Utilities", amount: 8900, color: "bg-green-500" },
    { name: "Software", amount: 15400, color: "bg-purple-500" },
    { name: "Travel", amount: 7200, color: "bg-yellow-500" },
    { name: "Equipment", amount: 21000, color: "bg-pink-500" },
  ];

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-1" /> Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold">{formatCurrency(65000)}</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">{formatCurrency(12500)}</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Last Month</p>
            <p className="text-2xl font-bold">{formatCurrency(18750)}</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Pending Approvals</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Your most recent expense transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left font-medium py-3 px-4">Date</th>
                        <th className="text-left font-medium py-3 px-4">Category</th>
                        <th className="text-left font-medium py-3 px-4">Description</th>
                        <th className="text-right font-medium py-3 px-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentExpenses.map((expense) => (
                        <tr key={expense.id} className="border-t">
                          <td className="py-3 px-4">{formatDate(expense.date)}</td>
                          <td className="py-3 px-4">{expense.category}</td>
                          <td className="py-3 px-4">{expense.description}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(expense.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" /> View All Expenses
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Monthly Breakdown</CardTitle>
                <CardDescription>Expense trends over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Chart visualization will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category) => (
                    <div key={category.name} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${category.color} mr-2`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>{category.name}</span>
                          <span className="font-medium">{formatCurrency(category.amount)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`${category.color} h-2 rounded-full`} 
                            style={{ width: `${(category.amount / 65000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>Complete list of your expense transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4 space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" /> Filter by Date
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
                <div className="h-[400px] flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Transactions table will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Expenses;
