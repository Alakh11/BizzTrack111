
import { Button } from "@/components/ui/button";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

const Badge = ({ children, variant = "default", className = "" }: BadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
      ${variant === "default" ? "bg-primary text-primary-foreground" : "border"}
      ${className}`}
  >
    {children}
  </span>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full">{children}</table>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead>{children}</thead>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b last:border-b-0">{children}</tr>
);

const TableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-3 text-left text-sm font-medium ${className}`}>{children}</th>
);

const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 text-sm ${className}`}>{children}</td>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

export const SettingsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Apr 23, 2024</TableCell>
          <TableCell>$29.00</TableCell>
          <TableCell>
            <Badge
              variant="outline"
              className="bg-success-light text-success border-success"
            >
              Paid
            </Badge>
          </TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Mar 23, 2024</TableCell>
          <TableCell>$29.00</TableCell>
          <TableCell>
            <Badge
              variant="outline"
              className="bg-success-light text-success border-success"
            >
              Paid
            </Badge>
          </TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Feb 23, 2024</TableCell>
          <TableCell>$29.00</TableCell>
          <TableCell>
            <Badge
              variant="outline"
              className="bg-success-light text-success border-success"
            >
              Paid
            </Badge>
          </TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
