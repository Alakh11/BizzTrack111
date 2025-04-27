import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ChartPie,
  Download,
  IndianRupee,
  FileBarChart,
  Receipt,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for charts
const monthlyData = [
  { name: "Jan", income: 240000, expenses: 180000 },
  { name: "Feb", income: 260000, expenses: 170000 },
  { name: "Mar", income: 190000, expenses: 150000 },
  { name: "Apr", income: 320000, expenses: 190000 },
  { name: "May", income: 280000, expenses: 210000 },
  { name: "Jun", income: 350000, expenses: 220000 },
];

const categoryExpenses = [
  { name: "Office", value: 150000 },
  { name: "Travel", value: 80000 },
  { name: "Software", value: 120000 },
  { name: "Marketing", value: 95000 },
  { name: "Utilities", value: 45000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

const topClients = [
  { name: "Tech Solutions Inc.", revenue: 1250000 },
  { name: "Global Traders Ltd.", revenue: 980000 },
  { name: "Innovate Systems", revenue: 725000 },
  { name: "Reliable Services", revenue: 650000 },
  { name: "Premier Corp.", revenue: 570000 },
];

// Tax data
const gstData = [
  { month: "Jan", collected: 36000, paid: 27000, net: 9000 },
  { month: "Feb", collected: 39000, paid: 25500, net: 13500 },
  { month: "Mar", collected: 28500, paid: 22500, net: 6000 },
  { month: "Apr", collected: 48000, paid: 28500, net: 19500 },
  { month: "May", collected: 42000, paid: 31500, net: 10500 },
  { month: "Jun", collected: 52500, paid: 33000, net: 19500 },
];

// Client metrics
const clientMetrics = [
  { metric: "Average Revenue per Client", value: 825000 },
  { metric: "Client Retention Rate", value: "78%" },
  { metric: "New Clients (YTD)", value: 14 },
  { metric: "Active Clients", value: 32 },
];

// Financial ratios
const financialRatios = [
  { name: "Profit Margin", value: 25 },
  { name: "Operating Margin", value: 32 },
  { name: "Return on Assets", value: 18 },
  { name: "Current Ratio", value: 2.4 },
  { name: "Debt to Equity", value: 0.75 },
];

export default function Reports() {
  // Format currency as INR
  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN")}`;
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

        {/* Report Type Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="mb-2">
            <TabsTrigger value="overview" className="flex items-center">
              <ChartPie className="h-4 w-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center">
              <FileBarChart className="h-4 w-4 mr-2" /> Financial
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center">
              <Receipt className="h-4 w-4 mr-2" /> Tax
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center">
              <Users className="h-4 w-4 mr-2" /> Clients
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    16,40,000
                  </p>
                  <p className="text-xs text-success">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Total Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    11,20,000
                  </p>
                  <p className="text-xs text-destructive">
                    +5.2% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Net Profit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    5,20,000
                  </p>
                  <p className="text-xs text-success">+8.7% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Outstanding Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    3,75,000
                  </p>
                  <p className="text-xs text-warning">14 pending invoices</p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue vs Expenses Chart */}
            <Card className="mt-6">
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
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                      <Legend />
                      <Bar dataKey="income" name="Revenue" fill="#4C9AFF" />
                      <Bar dataKey="expenses" name="Expenses" fill="#FF5630" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Two Column Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {categoryExpenses.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                        <Legend />
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
                          <TableCell className="text-right flex justify-end items-center">
                            <IndianRupee className="h-3 w-3 mr-1" />
                            {client.revenue.toLocaleString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Tab Content */}
          <TabsContent value="financial">
            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Gross Profit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    7,50,000
                  </p>
                  <p className="text-xs text-success">+9.2% YoY</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Operating Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    3,86,000
                  </p>
                  <p className="text-xs text-success">-2.1% YoY</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    EBITDA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    3,64,000
                  </p>
                  <p className="text-xs text-success">+11.3% YoY</p>
                </CardContent>
              </Card>
            </div>

            {/* Financial Ratios */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Financial Ratios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={financialRatios}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, "dataMax"]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => `${value}`} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly P&L */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Monthly Profit & Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="income"
                        name="Revenue"
                        stroke="#4C9AFF"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        name="Expenses"
                        stroke="#FF5630"
                      />
                      <Line
                        type="monotone"
                        dataKey={(data) => data.income - data.expenses}
                        name="Profit"
                        stroke="#36B37E"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tax Tab Content */}
          <TabsContent value="tax">
            {/* GST Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    GST Collected (YTD)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    2,46,000
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    GST Paid (YTD)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    1,68,000
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    GST Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    78,000
                  </p>
                  <p className="text-xs">Due by 20th of next month</p>
                </CardContent>
              </Card>
            </div>

            {/* GST Breakdown Chart */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>GST Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gstData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                      <Legend />
                      <Bar
                        dataKey="collected"
                        name="GST Collected"
                        fill="#4C9AFF"
                      />
                      <Bar dataKey="paid" name="GST Paid" fill="#FF5630" />
                      <Bar dataKey="net" name="GST Balance" fill="#36B37E" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tax Filing Schedule */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Tax Filing Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tax Type</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>GSTR-1</TableCell>
                      <TableCell>Apr 2023</TableCell>
                      <TableCell>May 11, 2023</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-success-light text-success border-success"
                        >
                          Filed
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>GSTR-3B</TableCell>
                      <TableCell>Apr 2023</TableCell>
                      <TableCell>May 20, 2023</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-success-light text-success border-success"
                        >
                          Filed
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>GSTR-1</TableCell>
                      <TableCell>May 2023</TableCell>
                      <TableCell>Jun 11, 2023</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-warning-light text-warning border-warning"
                        >
                          Pending
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TDS Return</TableCell>
                      <TableCell>Q1 2023-24</TableCell>
                      <TableCell>Jul 31, 2023</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-warning-light text-warning border-warning"
                        >
                          Upcoming
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab Content */}
          <TabsContent value="clients">
            {/* Client Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {clientMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      {metric.metric}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {typeof metric.value === "number" &&
                      metric.value > 1000 ? (
                        <span className="flex items-center">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          {metric.value.toLocaleString("en-IN")}
                        </span>
                      ) : (
                        metric.value
                      )}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Client Revenue Distribution */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Client Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topClients}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                        nameKey="name"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {topClients.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Client Performance */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Client Performance (Last 6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Avg. Project Value</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead className="text-right">
                        Total Revenue
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Tech Solutions Inc.</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>{formatCurrency(250000)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-success-light text-success border-success"
                        >
                          On Time
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(1250000)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Global Traders Ltd.</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>{formatCurrency(326667)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-success-light text-success border-success"
                        >
                          On Time
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(980000)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Innovate Systems</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>{formatCurrency(181250)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-warning-light text-warning border-warning"
                        >
                          Delayed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(725000)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Reliable Services</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>{formatCurrency(325000)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-success-light text-success border-success"
                        >
                          On Time
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(650000)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
