
import MainLayout from "@/components/layout/MainLayout";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import TopClients from "@/components/dashboard/TopClients";
import PaymentDuesAlert from "@/components/dashboard/PaymentDuesAlert";
import TopClientsChart from "@/components/dashboard/TopClientsChart";
import ExpensesByCategory from "@/components/dashboard/ExpensesByCategory";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransactions } from "@/hooks/useTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Eye, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { storedReceipts } = useTransactions();
  const navigate = useNavigate();

  const recentReceipts = storedReceipts.slice(0, 5);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business.
          </p>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />
            <RevenueChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopClientsChart />
              <ExpensesByCategory />
            </div>
          </TabsContent>

          <TabsContent value="receipts" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Receipts</CardTitle>
                <Button variant="outline" size="sm" onClick={() => navigate("/billing")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {recentReceipts.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentReceipts.map((receipt) => (
                        <TableRow key={receipt.id}>
                          <TableCell>
                            {formatDate(receipt.created_at)}
                          </TableCell>
                          <TableCell>{receipt.transactions.transaction_number}</TableCell>
                          <TableCell>{receipt.transactions.customer_name || "N/A"}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(receipt.transactions.total_amount)}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate("/billing")}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-6 text-center text-muted-foreground">
                    <Receipt className="mx-auto h-12 w-12 opacity-50 mb-2" />
                    <p>No recent receipts found</p>
                    <Button 
                      className="mt-4" 
                      variant="outline" 
                      onClick={() => navigate("/billing")}
                    >
                      Create Receipt
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <RecentInvoices />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <PaymentDuesAlert />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <ExpensesByCategory />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentInvoices />
          <PaymentDuesAlert />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
