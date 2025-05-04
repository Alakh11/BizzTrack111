
import MainLayout from "@/components/layout/MainLayout";
import DashboardStats from "@/components/dashboard/DashboardStats";
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

        <DashboardStats />

        <RevenueChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentInvoices />
          <TopClients />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
