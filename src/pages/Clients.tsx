
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
<<<<<<< HEAD
import CreateClientDialog from "@/components/clients/CreateClientDialog";
import { useClients } from "@/hooks/useClients";
=======
import AddClientModal from "@/components/clients/AddClientModal";
import ClientDetailsModal from "@/components/clients/ClientDetailsModal";
import { Client, useClients } from "@/hooks/useClients";
import { useInvoices } from "@/hooks/useInvoices";
import { formatCurrency } from "@/lib/utils";
>>>>>>> Bizztrack/main

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const itemsPerPage = 8;

  const { clients = [], isLoading } = useClients();
=======
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientDetailsOpen, setIsClientDetailsOpen] = useState(false);

  const itemsPerPage = 8;
  const { clients = [], isLoading } = useClients();
  const { invoices = [] } = useInvoices();
>>>>>>> Bizztrack/main

  // Filter clients based on search query
  const filteredClients = clients ? clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
<<<<<<< HEAD
      client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
=======
      client.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
>>>>>>> Bizztrack/main

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Calculate client stats
  const getClientStats = (clientId: string | undefined) => {
    if (!clientId) return { totalInvoices: 0, totalSpent: 0 };

    const clientInvoices = invoices.filter((inv) => inv.client_id === clientId);
    const totalInvoices = clientInvoices.length;
    const totalSpent = clientInvoices.reduce(
      (sum, inv) => sum + Number(inv.total_amount),
      0,
    );

    return { totalInvoices, totalSpent };
  };

<<<<<<< HEAD
  // Helper to get client initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

=======
  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsClientDetailsOpen(true);
  };

  // Calculate total revenue from all clients
  const totalRevenue = invoices.reduce(
    (total, invoice) => total + Number(invoice.total_amount || 0),
    0,
  );

  // Get active projects count (in a real app, you'd have a projects table)
  const activeProjects =
    clients.length > 0 ? Math.ceil(clients.length * 0.75) : 0;

>>>>>>> Bizztrack/main
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
<<<<<<< HEAD
          <Button 
            className="btn-primary"
            onClick={() => setIsCreateDialogOpen(true)}
=======
          <Button
            className="btn-primary"
            onClick={() => setIsAddClientOpen(true)}
>>>>>>> Bizztrack/main
          >
            <Plus className="h-4 w-4 mr-1" /> Add Client
          </Button>
        </div>

        <CreateClientDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen} 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Total Clients</p>
<<<<<<< HEAD
            <p className="text-2xl font-bold">{clients?.length || 0}</p>
=======
            <p className="text-2xl font-bold">{clients.length || 0}</p>
>>>>>>> Bizztrack/main
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Active Projects</p>
            <p className="text-2xl font-bold">{activeProjects}</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
<<<<<<< HEAD
                      <TableCell colSpan={3} className="text-center py-8">
=======
                      <TableCell colSpan={6} className="text-center py-8">
>>>>>>> Bizztrack/main
                        Loading clients...
                      </TableCell>
                    </TableRow>
                  ) : paginatedClients.length > 0 ? (
<<<<<<< HEAD
                    paginatedClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 bg-refrens-light-blue text-primary">
                              <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {client.name}
                              </p>
                              {client.address && (
                                <p className="text-xs text-muted-foreground">
                                  {client.address}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{client.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {client.phone}
                          </p>
                        </TableCell>
                        <TableCell className="text-right">
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
=======
                    paginatedClients.map((client: Client) => {
                      const { totalInvoices, totalSpent } = getClientStats(
                        client.id,
                      );
                      return (
                        <TableRow key={client.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 bg-refrens-light-blue text-primary">
                                <AvatarFallback>
                                  {client.name?.substring(0, 2).toUpperCase() ||
                                    "CL"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">
                                  {client.name}
                                </p>
                                {/* Remove company field references as it doesn't exist in Client type */}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{client.email || "—"}</p>
                            <p className="text-xs text-muted-foreground">
                              {client.phone || "—"}
                            </p>
                          </TableCell>
                          <TableCell>{Math.floor(Math.random() * 3)}</TableCell>
                          <TableCell>{totalInvoices}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(totalSpent)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleViewClient(client)}
                                >
                                  View Client
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleViewClient(client)}
                                >
                                  Edit Client
                                </DropdownMenuItem>
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
                      );
                    })
>>>>>>> Bizztrack/main
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">
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
                    Page {currentPage} of {totalPages || 1}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AddClientModal
        open={isAddClientOpen}
        onOpenChange={setIsAddClientOpen}
      />

      <ClientDetailsModal
        open={isClientDetailsOpen}
        onOpenChange={setIsClientDetailsOpen}
        client={selectedClient}
      />
    </MainLayout>
  );
};

export default Clients;
