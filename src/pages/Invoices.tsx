
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import InvoicesList from "@/components/invoices/InvoicesList";

const Invoices = () => {
  const navigate = useNavigate();

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
        
        <InvoicesList />
      </div>
    </MainLayout>
  );
};

export default Invoices;
