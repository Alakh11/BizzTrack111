import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  projects: number;
  invoices: number;
  totalSpent: number;
  initials: string;
}

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const clients: Client[] = [
    {
      id: "1",
      name: "John Smith",
      company: "Acme Inc",
      email: "john.smith@acme.com",
      phone: "+1 (555) 123-4567",
      projects: 8,
      invoices: 12,
      totalSpent: 12500,
      initials: "JS",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      company: "TechGiant Co",
      email: "sarah.j@techgiant.com",
      phone: "+1 (555) 234-5678",
      projects: 5,
      invoices: 7,
      totalSpent: 10800,
      initials: "SJ",
    },
    {
      id: "3",
      name: "Michael Brown",
      company: "Globe Media",
      email: "michael.b@globemedia.com",
      phone: "+1 (555) 345-6789",
      projects: 4,
      invoices: 5,
      totalSpent: 9500,
      initials: "MB",
    },
    {
      id: "4",
      name: "Emily Davis",
      company: "Bright Solutions",
      email: "emily.d@brightsolutions.com",
      phone: "+1 (555) 456-7890",
      projects: 3,
      invoices: 4,
      totalSpent: 7200,
      initials: "ED",
    },
    {
      id: "5",
      name: "Robert Wilson",
      company: "Nova Systems",
      email: "robert.w@novasystems.com",
      phone: "+1 (555) 567-8901",
      projects: 2,
      invoices: 3,
      totalSpent: 5400,
      initials: "RW",
    },
    {
      id: "6",
      name: "Lisa Thompson",
      company: "Quantum Research",
      email: "lisa.t@quantumresearch.com",
      phone: "+1 (555) 678-9012",
      projects: 6,
      invoices: 9,
      totalSpent: 11200,
      initials: "LT",
    },
    {
      id: "7",
      name: "David Clark",
      company: "Sunrise Media",
      email: "david.c@sunrisemedia.com",
      phone: "+1 (555) 789-0123",
      projects: 3,
      invoices: 4,
      totalSpent: 6800,
      initials: "DC",
    },
    {
      id: "8",
      name: "Jennifer Lee",
      company: "Blue Ocean Inc",
      email: "jennifer.l@blueocean.com",
      phone: "+1 (555) 890-1234",
      projects: 5,
      invoices: 6,
      totalSpent: 8900,
      initials: "JL",
    },
    {
      id: "9",
      name: "William Green",
      company: "Green Planet Solutions",
      email: "william.g@greenplanet.com",
      phone: "+1 (555) 901-2345",
      projects: 2,
      invoices: 3,
      totalSpent: 4200,
      initials: "WG",
    },
    {
      id: "10",
      name: "Amanda White",
      company: "Silver Technologies",
      email: "amanda.w@silvertech.com",
      phone: "+1 (555) 012-3456",
      projects: 4,
      invoices: 7,
      totalSpent: 9800,
      initials: "AW",
    },
  ];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <p className="text-muted-foreground">
              Manage and track all your clients
            </p>
          </div>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-1" /> Add Client
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Total Clients</p>
            <p className="text-2xl font-bold">32</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Active Projects</p>
            <p className="text-2xl font-bold">18</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">$45,231.89</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Clients</CardTitle>
            <CardDescription>
              View and manage your client relationships.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and filter */}
            <div className="flex mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Clients Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Invoices</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedClients.length > 0 ? (
                    paginatedClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 bg-refrens-light-blue text-primary">
                              <AvatarFallback>{client.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {client.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {client.company}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{client.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {client.phone}
                          </p>
                        </TableCell>
                        <TableCell>{client.projects}</TableCell>
                        <TableCell>{client.invoices}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(client.totalSpent)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Client</DropdownMenuItem>
                              <DropdownMenuItem>Edit Client</DropdownMenuItem>
                              <DropdownMenuItem>
                                Create Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete Client
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No clients found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredClients.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredClients.length)}{" "}
                  of {filteredClients.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Clients;
