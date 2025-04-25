
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TableHead, 
  TableHeader, 
  TableRow, 
  Table,
  TableBody,
  TableCell 
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ChartPie, Download } from "lucide-react";

// Sample data for charts
const monthlyData = [
  { name: "Jan", income: 24000, expenses: 18000 },
  { name: "Feb", income: 26000, expenses: 17000 },
  { name: "Mar", income: 19000, expenses: 15000 },
  { name: "Apr", income: 32000, expenses: 19000 },
  { name: "May", income: 28000, expenses: 21000 },
  { name: "Jun", income: 35000, expenses: 22000 },
];

const categoryExpenses = [
  { name: "Office", value: 15000 },
  { name: "Travel", value: 8000 },
  { name: "Software", value: 12000 },
  { name: "Marketing", value: 9500 },
  { name: "Utilities", value: 4500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const topClients = [
  { name: "Tech Solutions Inc.", revenue: 125000 },
  { name: "Global Traders Ltd.", revenue: 98000 },
  { name: "Innovate Systems", revenue: 72500 },
  { name: "Reliable Services", revenue: 65000 },
  { name: "Premier Corp.", revenue: 57000 },
];

export default function Reports() {
  // Format currency as INR
  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">
              Analytics and insights for your business
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export Reports
          </Button>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(164000)}</p>
              <p className="text-xs text-success">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(112000)}</p>
              <p className="text-xs text-destructive">+5.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(52000)}</p>
              <p className="text-xs text-success">+8.7% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Outstanding Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(37500)}</p>
              <p className="text-xs text-warning">14 pending invoices</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs. Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="income" name="Revenue" fill="#4C9AFF" />
                  <Bar dataKey="expenses" name="Expenses" fill="#FF5630" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expense Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryExpenses}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryExpenses.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Clients */}
          <Card>
            <CardHeader>
              <CardTitle>Top Clients by Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topClients.map((client) => (
                    <TableRow key={client.name}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(client.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
