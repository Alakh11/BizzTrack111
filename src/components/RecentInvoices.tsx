
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardCard from "./DashboardCard";

const mockInvoices = [
  { id: "INV-001", client: "Acme Corp", amount: "$1,200", date: "2025-04-20", status: "Paid" },
  { id: "INV-002", client: "TechStart", amount: "$850", date: "2025-04-15", status: "Pending" },
  { id: "INV-003", client: "Global Inc", amount: "$2,300", date: "2025-04-10", status: "Paid" },
];

const RecentInvoices = () => {
  return (
    <DashboardCard title="Recent Invoices" className="col-span-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {invoice.status}
                </span>
              </TableCell>
            </TableRow>
          )TableBody>
        </Table>
      </DashboardCard>
    );
};

export default RecentInvoices;
