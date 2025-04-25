
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Edit, Trash, Send, IndianRupee } from "lucide-react";

const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        if (!id) return;

        // Fetch invoice details
        const { data: invoiceData, error: invoiceError } = await supabase
          .from('invoices')
          .select('*, client:client_id(*)')
          .eq('id', id)
          .single();

        if (invoiceError) throw invoiceError;

        // Fetch invoice items
        const { data: itemsData, error: itemsError } = await supabase
          .from('invoice_items')
          .select('*, service:service_id(*)')
          .eq('invoice_id', id);

        if (itemsError) throw itemsError;

        setInvoice(invoiceData);
        setItems(itemsData || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching invoice details:', error);
        setError("Failed to load invoice details");
        setIsLoading(false);
      }
    };

    fetchInvoiceDetails();

    // Set up real-time listener
    const channel = supabase
      .channel('invoice-details-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'invoices',
        filter: `id=eq.${id}` 
      }, () => {
        fetchInvoiceDetails();
      })
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'invoice_items',
        filter: `invoice_id=eq.${id}` 
      }, () => {
        fetchInvoiceDetails();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const formatCurrency = (value) => {
    return `₹${Number(value).toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-success-light text-success border-success";
      case "pending":
        return "bg-warning-light text-warning border-warning";
      case "overdue":
        return "bg-error-light text-error border-error";
      default:
        return "bg-info-light text-info border-info";
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-lg">Loading invoice details...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !invoice) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <p className="text-lg text-destructive">{error || "Invoice not found"}</p>
          <Link to="/invoices">
            <Button>Back to Invoices</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Link to="/invoices" className="mr-4">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Invoice #{invoice.invoice_number}</h1>
              <p className="text-muted-foreground">
                Created on {formatDate(invoice.created_at)}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            <Button variant="outline">
              <Send className="h-4 w-4 mr-2" /> Send
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="destructive">
              <Trash className="h-4 w-4 mr-2" /> Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className={`${getStatusColor(invoice.status)} border`}>
                {invoice.status}
              </Badge>
              <p className="mt-2 text-sm text-muted-foreground">
                Total Amount: <span className="font-semibold">{formatCurrency(invoice.total_amount)}</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Invoice Date</p>
                  <p className="font-medium">{formatDate(invoice.invoice_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{formatDate(invoice.due_date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{invoice.client?.name || 'Unknown Client'}</p>
                <p className="text-sm text-muted-foreground">
                  {invoice.client?.email || 'No email provided'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {invoice.client?.phone || 'No phone provided'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {invoice.client?.address || 'No address provided'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Invoice Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-right">Unit Price</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <tr key={item.id} className={index !== items.length - 1 ? "border-b" : ""}>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{item.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.service?.name || ''}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">{item.quantity}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(item.unit_price)}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center">
                        No items found for this invoice
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t">
                    <td colSpan={3} className="py-3 px-4 text-right font-medium">
                      Total Amount:
                    </td>
                    <td className="py-3 px-4 text-right font-bold">
                      {formatCurrency(invoice.total_amount)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {invoice.notes && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{invoice.notes}</p>
            </CardContent>
          </Card>
        )}

        {invoice.terms && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{invoice.terms}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default InvoiceDetails;
