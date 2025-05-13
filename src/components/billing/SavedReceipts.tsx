
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Printer, Trash, Eye, Edit } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import BillingReceipt from "./BillingReceipt";
import { useToast } from "@/hooks/use-toast";

interface SavedReceiptsProps {
  onEdit: (receiptData: any) => void;
}

const SavedReceipts: React.FC<SavedReceiptsProps> = ({ onEdit }) => {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const { data, error } = await supabase
        .from("stored_receipts")
        .select("*, transactions(*)")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReceipts(data || []);
    } catch (error) {
      console.error("Error fetching receipts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setShowReceipt(true);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleEditReceipt = (receipt: any) => {
    onEdit(receipt);
    setShowReceipt(false);
  };

  const handleDeleteReceipt = async (id: string) => {
    try {
      const { error } = await supabase
        .from("stored_receipts")
        .update({ is_deleted: true })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Receipt deleted successfully",
      });

      setReceipts(receipts.filter(receipt => receipt.id !== id));
    } catch (error) {
      console.error("Error deleting receipt:", error);
      toast({
        title: "Error",
        description: "Failed to delete receipt",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Saved Receipts</CardTitle>
          <CardDescription>
            View and manage your previously saved receipts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : receipts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No saved receipts found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receipts.map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell>
                        {formatDate(new Date(receipt.created_at).toISOString())}
                      </TableCell>
                      <TableCell>{receipt.transactions.transaction_number}</TableCell>
                      <TableCell>{receipt.transactions.customer_name || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(receipt.transactions.total_amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewReceipt(receipt)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditReceipt(receipt)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteReceipt(receipt.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="sm:max-w-xl">
          {selectedReceipt && selectedReceipt.receipt_data && (
            <BillingReceipt
              items={selectedReceipt.receipt_data.items}
              transactionNumber={selectedReceipt.transactions.transaction_number}
              totalAmount={selectedReceipt.transactions.total_amount}
              date={new Date(selectedReceipt.transactions.date)}
              paymentMethod={selectedReceipt.transactions.payment_method}
              customerName={selectedReceipt.transactions.customer_name}
              customerMobile={selectedReceipt.transactions.customer_mobile}
              onPrint={handlePrintReceipt}
              onClose={() => setShowReceipt(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SavedReceipts;
