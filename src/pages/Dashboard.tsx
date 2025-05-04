
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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business.
          </p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
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
