
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockClients = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "(555) 123-4567",
    invoiceCount: 12,
    totalBilled: "$14,500",
  },
  {
    id: 2,
    name: "TechStart Industries",
    email: "billing@techstart.com",
    phone: "(555) 987-6543",
    invoiceCount: 8,
    totalBilled: "$9,200",
  },
  {
    id: 3,
    name: "Global Solutions Inc",
    email: "accounts@globalsolutions.com",
    phone: "(555) 456-7890",
    invoiceCount: 15,
    totalBilled: "$23,100",
  },
];

const Clients = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Invoices</TableHead>
                <TableHead>Total Billed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.invoiceCount}</TableCell>
                  <TableCell>{client.totalBilled}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Clients;
