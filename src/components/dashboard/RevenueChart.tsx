
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "./ChartCard";
import { supabase } from "@/integrations/supabase/client";

const RevenueChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRevenueData = async () => {
    try {
      const { data: invoicesData, error } = await supabase
        .from('invoices')
        .select('invoice_date, total_amount');

      if (error) throw error;

      // Process data for chart
      const monthlyData = {};
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      
      // Initialize months with zero
      months.forEach(month => {
        monthlyData[month] = 0;
      });

      // Aggregate invoice amounts by month
      invoicesData?.forEach(invoice => {
        const date = new Date(invoice.invoice_date);
        const month = months[date.getMonth()];
        monthlyData[month] += Number(invoice.total_amount);
      });

      // Convert to array format for chart
      const chartData = months.map(month => ({
        name: month,
        revenue: monthlyData[month]
      }));

      setChartData(chartData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData();

    // Set up real-time listener
    const channel = supabase
      .channel('revenue-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'invoices' 
      }, () => {
        fetchRevenueData();
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
    <ChartCard
      title="Revenue Overview"
      description="Monthly revenue performance"
    >
      <div className="h-[300px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        ) : (
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
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2C5CC5"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
};

export default RevenueChart;
