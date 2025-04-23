
import { FileText, Users, DollarSign, CreditCard } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import TopClients from "@/components/dashboard/TopClients";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            change="12.5%"
            isPositive={true}
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatCard
            title="Invoices"
            value="145"
            change="4.3%"
            isPositive={true}
            icon={<FileText className="h-5 w-5" />}
          />
          <StatCard
            title="Clients"
            value="32"
            change="2.1%"
            isPositive={true}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Pending"
            value="$12,450.00"
            change="1.8%"
            isPositive={false}
            icon={<CreditCard className="h-5 w-5" />}
          />
        </div>

        {/* Revenue Chart */}
        <RevenueChart />

        {/* Recent Invoices and Top Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentInvoices />
          <TopClients />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
