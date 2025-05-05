
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import InvoicesList from "@/components/invoices/InvoicesList";
import { Card } from "@/components/ui/card";
import { useInvoices } from "@/hooks/useInvoices";

const Invoices = () => {
  const navigate = useNavigate();
  const { invoices, isLoading } = useInvoices();

  // Get 5 most recent invoices
  const recentInvoices = invoices ? [...invoices].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }).slice(0, 5) : [];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-4">
          <div>
            <h1 className="text-2xl font-bold">Invoices</h1>
            <p className="text-muted-foreground">
              Manage and track all your invoices
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={() => navigate("/invoices/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Invoice
            </Button>
          </div>
        </div>
        
        {recentInvoices.length > 0 && (
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-4">Recent Invoices</h2>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div 
                  key={invoice.id}
                  className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <h3 className="font-medium">Invoice #{invoice.invoice_number}</h3>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <p>Client: {invoice.client?.name || "N/A"}</p>
                      <p>Date: {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                      <p>Amount: ₹{invoice.total_amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/invoices/edit/${invoice.id}`)}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}
        
        <InvoicesList />
      </div>
    </MainLayout>
  );
};

export default Invoices;
