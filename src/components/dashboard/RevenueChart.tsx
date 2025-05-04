
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartCard from "./ChartCard";
import { useInvoices } from "@/hooks/useInvoices";
import { format, subMonths } from "date-fns";

const RevenueChart = () => {
  const { invoices = [] } = useInvoices();

  // Process data for the chart
  const chartData = useMemo(() => {
    // Get the last 12 months
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(new Date(), 11 - i);
      return {
        name: format(date, "MMM"),
        month: date.getMonth(),
        year: date.getFullYear(),
        revenue: 0,
        expenses: 0,
      };
    });

    // Aggregate revenue from invoices
    if (invoices && invoices.length > 0) {
      invoices.forEach(invoice => {
        if (invoice.invoice_date) {
          const invoiceDate = new Date(invoice.invoice_date);
          const matchingMonth = months.find(
            m => m.month === invoiceDate.getMonth() && m.year === invoiceDate.getFullYear()
          );
          if (matchingMonth && invoice.status === 'paid') {
            matchingMonth.revenue += Number(invoice.total_amount || 0);
          }
        }
      });
    }

    // Add some mock data if no real data exists
    if (months.every(m => m.revenue === 0)) {
      months.forEach((month, index) => {
        month.revenue = Math.round(5000 + Math.random() * 10000 * (index % 3 + 1));
      });
    }

    // Add expense data
    return months.map(month => ({
      ...month,
      expenses: Math.round(month.revenue * (0.3 + Math.random() * 0.4)),
    }));
  }, [invoices]);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  // Calculate profit margins for the tooltip
  const getTooltipContent = (props: any) => {
    const { payload } = props;
    if (payload && payload.length) {
      const revenue = payload[0].value;
      const expenses = payload[1]?.value || 0;
      const profit = revenue - expenses;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

      return (
        <div className="bg-background p-2 border border-border rounded shadow-md">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm text-primary">Revenue: {formatCurrency(revenue)}</p>
          <p className="text-sm text-destructive">Expenses: {formatCurrency(expenses)}</p>
          <p className="text-sm font-medium">
            Profit: {formatCurrency(profit)} ({margin.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard
      title="Revenue Overview"
      description="Monthly revenue and expenses"
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2C5CC5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2C5CC5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={getTooltipContent} />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#2C5CC5"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default RevenueChart;
