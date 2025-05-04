
import { useClients } from "@/hooks/useClients";
import { useInvoices } from "@/hooks/useInvoices";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "./ChartCard";

interface TopClient {
  id: string;
  name: string;
  value: number;
  color: string;
}

const COLORS = [
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
];

const TopClientsChart = () => {
  const { invoices = [] } = useInvoices();
  const { clients = [] } = useClients();

  const topClients = useMemo(() => {
    // Calculate total revenue by client
    const clientRevenue: Record<string, number> = {};

    invoices.forEach((invoice) => {
      const clientId = invoice.client_id;
      if (!clientId) return;
      
      const amount = Number(invoice.total_amount || 0);
      if (clientRevenue[clientId]) {
        clientRevenue[clientId] += amount;
      } else {
        clientRevenue[clientId] = amount;
      }
    });

    // Map to clients data with names
    const clientsData: TopClient[] = Object.entries(clientRevenue)
      .map(([id, value]) => {
        const client = clients.find((c) => c.id === id);
        return {
          id,
          name: client?.name || "Unknown client",
          value,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return clientsData;
  }, [invoices, clients]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-primary">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard title="Top Revenue Clients" description="Top 5 clients by billing">
      <div className="h-[230px]">
        {topClients.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topClients}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {topClients.map((client, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No client data available
          </div>
        )}
      </div>

      <div className="mt-4">
        <ul className="space-y-1">
          {topClients.map((client, index) => (
            <li key={client.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm truncate max-w-[160px]">{client.name}</span>
              </div>
              <span className="text-sm font-medium">
                ₹{client.value.toLocaleString('en-IN')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
};

export default TopClientsChart;
