
import { useMemo } from "react";
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

const TopClients = () => {
  const clients = useMemo(
    () => [
      {
        id: "1",
        name: "Acme Inc",
        email: "contact@acme.com",
        amount: 12500,
        projects: 8,
        initials: "AI",
      },
      {
        id: "2",
        name: "TechGiant Co",
        email: "info@techgiant.com",
        amount: 10800,
        projects: 5,
        initials: "TG",
      },
      {
        id: "3",
        name: "Globe Media",
        email: "hello@globemedia.com",
        amount: 9500,
        projects: 4,
        initials: "GM",
      },
      {
        id: "4",
        name: "Bright Solutions",
        email: "support@brightsolutions.com",
        amount: 7200,
        projects: 3,
        initials: "BS",
      },
      {
        id: "5",
        name: "Nova Systems",
        email: "info@novasystems.com",
        amount: 5400,
        projects: 2,
        initials: "NS",
      },
    ],
    []
  );

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <ChartCard title="Top Clients" description="Based on revenue">
      <div className="overflow-x-auto">
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
                      <p className="font-medium text-sm">{client.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {client.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{client.projects}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(client.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ChartCard>
  );
};

export default TopClients;
