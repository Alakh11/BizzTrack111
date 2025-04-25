
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ChartCard from "./ChartCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  email: string;
  total_amount: number;
  projects_count: number;
  initials: string;
}

const TopClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopClients = async () => {
    try {
      // Fetch clients and their invoices for revenue calculation
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('id, name, email');

      if (clientsError) throw clientsError;

      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select('client_id, total_amount');

      if (invoicesError) throw invoicesError;

      // Calculate total revenue per client
      const clientRevenue = {};
      invoicesData?.forEach(invoice => {
        if (!clientRevenue[invoice.client_id]) {
          clientRevenue[invoice.client_id] = 0;
        }
        clientRevenue[invoice.client_id] += Number(invoice.total_amount);
      });

      // Map clients with their revenue
      const topClients = clientsData
        ?.map(client => {
          const revenue = clientRevenue[client.id] || 0;
          const initials = client.name
            .split(' ')
            .map(name => name[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
            
          return {
            id: client.id,
            name: client.name,
            email: client.email || '',
            total_amount: revenue,
            projects_count: 0, // This would need a separate query if we tracked projects
            initials
          };
        })
        .sort((a, b) => b.total_amount - a.total_amount)
        .slice(0, 5);

      setClients(topClients || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching top clients:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopClients();

    // Set up real-time listeners
    const channel = supabase
      .channel('top-clients-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'clients' 
      }, () => {
        fetchTopClients();
      })
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'invoices' 
      }, () => {
        fetchTopClients();
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
    <ChartCard title="Top Clients" description="Based on revenue">
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Loading clients...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">No clients found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 bg-refrens-light-blue text-primary">
                        <AvatarFallback>{client.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          to={`/clients/${client.id}`}
                          className="font-medium text-sm hover:underline"
                        >
                          {client.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {client.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.projects_count}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(client.total_amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </ChartCard>
  );
};

export default TopClients;
