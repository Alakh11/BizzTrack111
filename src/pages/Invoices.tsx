import MainLayout from "@/components/layout/MainLayout";
import InvoicesList from "@/components/invoices/InvoicesList";
import CreateInvoiceDialog from "@/components/invoices/CreateInvoiceDialog";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Invoices = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateInvoice = (data: any) => {
    toast({
      title: "Invoice Created",
      description: `Invoice ${data.invoiceNumber} has been created successfully.`,
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Invoices</h1>
            <p className="text-muted-foreground">
              Manage and track all your invoices
            </p>
          </div>
          <Button
            className="btn-primary"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" /> Create Invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Total Invoices</p>
            <p className="text-2xl font-bold">145</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Paid</p>
            <p className="text-2xl font-bold text-success">89</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">42</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-2xl font-bold text-destructive">14</p>
          </div>
        </div>

        <InvoicesList />

        <CreateInvoiceDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateInvoice}
        />
      </div>
    </MainLayout>
  );
};

export default Invoices;
