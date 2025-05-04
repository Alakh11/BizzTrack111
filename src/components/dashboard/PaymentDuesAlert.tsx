
import { useInvoices } from "@/hooks/useInvoices";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { format, compareDesc } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const PaymentDuesAlert = () => {
  const { invoices = [] } = useInvoices();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sentReminders, setSentReminders] = useState<Set<string>>(new Set());

  // Filter for overdue and upcoming invoices
  const overdueInvoices = invoices.filter(
    (inv) => 
      inv.status === "pending" && 
      new Date(inv.due_date) < new Date()
  );

  const upcomingInvoices = invoices.filter(
    (inv) => 
      inv.status === "pending" && 
      new Date(inv.due_date) >= new Date() &&
      new Date(inv.due_date) <= new Date(new Date().setDate(new Date().getDate() + 7))
  );

  // Sort by due date (most urgent first)
  const sortedDues = [...overdueInvoices, ...upcomingInvoices].sort((a, b) => 
    compareDesc(new Date(b.due_date), new Date(a.due_date))
  ).slice(0, 5);

  const handleSendReminder = (invoiceId: string, clientName: string) => {
    // Mock sending email
    toast({
      title: "Payment reminder sent",
      description: `Email reminder sent to ${clientName}`,
    });
    
    // Add to sent reminders list
    setSentReminders((prev) => new Set([...prev, invoiceId]));
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">
            <Bell className="w-4 h-4 inline-block mr-1" /> Payment Dues
          </CardTitle>
          <Button 
            variant="link" 
            className="text-sm p-0"
            onClick={() => navigate('/invoices')}
          >
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {sortedDues.length > 0 ? (
          <div className="space-y-4">
            {sortedDues.map((invoice) => (
              <div 
                key={invoice.id}
                className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{invoice.client?.name || "Unknown client"}</p>
                    {new Date(invoice.due_date) < new Date() ? (
                      <Badge variant="destructive">Overdue</Badge>
                    ) : (
                      <Badge variant="outline">Upcoming</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Invoice #{invoice.invoice_number} | Due: {formatDate(invoice.due_date)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-medium">{formatCurrency(Number(invoice.total_amount))}</p>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    disabled={sentReminders.has(invoice.id)}
                    onClick={() => handleSendReminder(
                      invoice.id, 
                      invoice.client?.name || "client"
                    )}
                  >
                    {sentReminders.has(invoice.id) ? "Reminder Sent" : "Send Reminder"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No upcoming payment dues
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentDuesAlert;
