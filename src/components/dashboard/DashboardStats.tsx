import { ReactNode } from "react";
import StatCard from "./StatCard";
import { IndianRupee, Users, FileText, CreditCard } from "lucide-react";
import { useInvoices } from "@/hooks/useInvoices";
import { useClients } from "@/hooks/useClients";

const DashboardStats = () => {
  const { invoices = [], isLoading: isInvoicesLoading } = useInvoices();
  const { clients = [], isLoading: isClientsLoading } = useClients();

  // Calculate stats
  const calculateStats = () => {
    if (isInvoicesLoading || isClientsLoading) {
      return {
        totalRevenue: 0,
        totalInvoices: 0,
        totalClients: 0,
        pendingAmount: 0,
        revenueChange: "+0%",
        invoiceChange: "+0%",
        clientChange: "+0%",
        pendingChange: "+0%",
      };
    }

    const totalRevenue = invoices.reduce((sum, inv) => {
      if (inv.status === "paid") return sum + Number(inv.total_amount || 0);
      return sum;
    }, 0);

    const pendingAmount = invoices.reduce((sum, inv) => {
      if (inv.status === "pending" || inv.status === "overdue") {
        return sum + Number(inv.total_amount || 0);
      }
      return sum;
    }, 0);

    // For demo purposes, generate some change percentages
    const revenueChange = "+12.5%";
    const invoiceChange = "+4.3%";
    const clientChange = "+2.1%";
    const pendingChange = "+1.8%";

    return {
      totalRevenue,
      totalInvoices: invoices.length,
      totalClients: clients.length,
      pendingAmount,
      revenueChange,
      invoiceChange,
      clientChange,
      pendingChange,
    };
  };

  const {
    totalRevenue,
    totalInvoices,
    totalClients,
    pendingAmount,
    revenueChange,
    invoiceChange,
    clientChange,
    pendingChange,
  } = calculateStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue"
        value={`₹${totalRevenue.toLocaleString()}`}
        change={revenueChange}
        isPositive={true}
        icon={<IndianRupee className="h-5 w-5" />}
      />
      <StatCard
        title="Invoices"
        value={totalInvoices.toString()}
        change={invoiceChange}
        isPositive={true}
        icon={<FileText className="h-5 w-5" />}
      />
      <StatCard
        title="Clients"
        value={totalClients.toString()}
        change={clientChange}
        isPositive={true}
        icon={<Users className="h-5 w-5" />}
      />
      <StatCard
        title="Pending"
        value={`₹${pendingAmount.toLocaleString()}`}
        change={pendingChange}
        isPositive={false}
        icon={<CreditCard className="h-5 w-5" />}
      />
    </div>
  );
};

export default DashboardStats;
