
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
  IndianRupee,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddClientModal from "@/components/clients/AddClientModal";
import { Client, useClients } from "@/hooks/useClients";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const itemsPerPage = 8;
  const { clients = [], isLoading } = useClients();

  const filteredClients = clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const formatCurrency = (value: number) => {
    return `₹${value?.toLocaleString() || '0'}`;
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
          <Button className="btn-primary" onClick={() => setIsAddClientOpen(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add Client
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Total Clients</p>
            <p className="text-2xl font-bold">{clients.length || 0}</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Active Projects</p>
            <p className="text-2xl font-bold">18</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">₹45,231.89</p>
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
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading clients...
                      </TableCell>
                    </TableRow>
                  ) : paginatedClients.length > 0 ? (
                    paginatedClients.map((client: Client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 bg-refrens-light-blue text-primary">
                              <AvatarFallback>
                                {client.name?.substring(0, 2).toUpperCase() || "CL"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {client.name}
                              </p>
                              {/* Company is removed from the type */}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{client.email || "—"}</p>
                          <p className="text-xs text-muted-foreground">
                            {client.phone || "—"}
                          </p>
                        </TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell className="text-right">
                          ₹0.00
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
                    Page {currentPage} of {totalPages || 1}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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
    </MainLayout>
  );
};

export default Clients;
