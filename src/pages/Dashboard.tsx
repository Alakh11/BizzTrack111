
import { useEffect, useState } from "react";
import { IndianRupee, Users, FileText, CreditCard } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import TopClients from "@/components/dashboard/TopClients";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalRevenue: number;
  totalInvoices: number;
  totalClients: number;
  pendingAmount: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalInvoices: 0,
    totalClients: 0,
    pendingAmount: 0,
  });
  
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total revenue
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select('total_amount, status');

      if (invoicesError) throw invoicesError;

      // Calculate total revenue and pending amount
      const totalRevenue = invoicesData?.reduce((sum, invoice) => sum + Number(invoice.total_amount), 0) || 0;
      const pendingAmount = invoicesData
        ?.filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue')
        .reduce((sum, invoice) => sum + Number(invoice.total_amount), 0) || 0;

      // Fetch total clients
      const { count: clientsCount, error: clientsError } = await supabase
        .from('clients')
        .select('id', { count: 'exact', head: true });

      if (clientsError) throw clientsError;

      setStats({
        totalRevenue,
        totalInvoices: invoicesData?.length || 0,
        totalClients: clientsCount || 0,
        pendingAmount,
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();

    // Set up real-time listeners
    const channel = supabase
      .channel('dashboard-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'invoices' 
      }, () => {
        fetchDashboardStats();
      })
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'clients' 
      }, () => {
        fetchDashboardStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={isLoading ? "Loading..." : formatCurrency(stats.totalRevenue)}
            change="12.5%"
            isPositive={true}
            icon={<IndianRupee className="h-5 w-5" />}
          />
          <StatCard
            title="Invoices"
            value={isLoading ? "Loading..." : stats.totalInvoices.toString()}
            change="4.3%"
            isPositive={true}
            icon={<FileText className="h-5 w-5" />}
          />
          <StatCard
            title="Clients"
            value={isLoading ? "Loading..." : stats.totalClients.toString()}
            change="2.1%"
            isPositive={true}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Pending"
            value={isLoading ? "Loading..." : formatCurrency(stats.pendingAmount)}
            change="1.8%"
            isPositive={false}
            icon={<CreditCard className="h-5 w-5" />}
          />
        </div>

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
