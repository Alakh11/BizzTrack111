
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Download, Users } from "lucide-react";

const ReportsClients = () => {
  const clients = [
    {
      id: "1",
      name: "Acme Inc",
      revenue: 125000,
      invoices: 8,
      outstanding: 15000,
      initials: "AI",
    },
    {
      id: "2",
      name: "TechGiant Co",
      revenue: 108000,
      invoices: 5,
      outstanding: 22000,
      initials: "TG",
    },
    {
      id: "3",
      name: "Globe Media",
      revenue: 95000,
      invoices: 4,
      outstanding: 0,
      initials: "GM",
    },
    {
      id: "4",
      name: "Bright Solutions",
      revenue: 72000,
      invoices: 3,
      outstanding: 18000,
      initials: "BS",
    },
    {
      id: "5",
      name: "Nova Systems",
      revenue: 54000,
      invoices: 2,
      outstanding: 12000,
      initials: "NS",
    },
  ];

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Client Reports</h1>
          <p className="text-muted-foreground">
            View client performance and payment history
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-3xl font-bold">32</span>
                  <p className="text-xs text-muted-foreground">+2 this month</p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-3xl font-bold">₹23.5L</span>
                  <p className="text-xs text-muted-foreground">+₹2.1L this month</p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-3xl font-bold">₹4.2L</span>
                  <p className="text-xs text-muted-foreground">From 14 invoices</p>
                </div>
                <div className="h-10 w-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Client Performance</CardTitle>
            <CardDescription>
              Revenue and payment history by client
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Total Revenue</TableHead>
                  <TableHead>Invoices</TableHead>
                  <TableHead>Outstanding</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                          <AvatarFallback>{client.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(client.revenue)}</TableCell>
                    <TableCell>{client.invoices}</TableCell>
                    <TableCell>
                      {client.outstanding > 0 ? (
                        <span className="text-warning">
                          {formatCurrency(client.outstanding)}
                        </span>
                      ) : (
                        <span className="text-success">Paid</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" /> Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReportsClients;
