
import { useMemo } from "react";
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

const RevenueChart = () => {
  // Sample data for the chart
  const data = useMemo(
    () => [
      { name: "Jan", revenue: 4000 },
      { name: "Feb", revenue: 3000 },
      { name: "Mar", revenue: 5000 },
      { name: "Apr", revenue: 2780 },
      { name: "May", revenue: 1890 },
      { name: "Jun", revenue: 2390 },
      { name: "Jul", revenue: 3490 },
      { name: "Aug", revenue: 4000 },
      { name: "Sep", revenue: 2000 },
      { name: "Oct", revenue: 2780 },
      { name: "Nov", revenue: 1890 },
      { name: "Dec", revenue: 3490 },
    ],
    []
  );

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <ChartCard
      title="Revenue Overview"
      description="Monthly revenue performance"
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
      </div>
    </ChartCard>
  );
};

export default RevenueChart;
