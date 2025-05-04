
import React from "react";
import { useProducts } from "@/hooks/useProducts";
import ClientSelection from "./invoice-details/ClientSelection";
import InvoiceOptions from "./invoice-details/InvoiceOptions";
import AdditionalFields from "./invoice-details/AdditionalFields";
import InvoiceItems from "./invoice-details/InvoiceItems";

interface InvoiceDetailsStepProps {
  form: any;
  clients: any[];
  items: any[];
  showShippingDetails: boolean;
  setShowShippingDetails: (show: boolean) => void;
  showTransportDetails: boolean;
  setShowTransportDetails: (show: boolean) => void;
  isGstDialogOpen: boolean;
  setIsGstDialogOpen: (open: boolean) => void;
  showAdditionalFields: boolean;
  setShowAdditionalFields: (show: boolean) => void;
  customInvoiceTitle: string;
  setCustomInvoiceTitle: (title: string) => void;
  customSubtitle: string;
  setCustomSubtitle: (subtitle: string) => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  purchaseOrderNumber: string;
  setPurchaseOrderNumber: (po: string) => void;
  referenceNumber: string;
  setReferenceNumber: (ref: string) => void;
  handleClientChange: (clientId: string) => void;
  handleItemChange: (id: number, field: string, value: any) => void;
  handleAddItem: () => void;
  handleRemoveItem: (id: number) => void;
  calculateTotal: () => number;
}

const InvoiceDetailsStep = ({
  form,
  clients,
  items,
  showShippingDetails,
  setShowShippingDetails,
  showTransportDetails,
  setShowTransportDetails,
  isGstDialogOpen,
  setIsGstDialogOpen,
  showAdditionalFields,
  setShowAdditionalFields,
  customInvoiceTitle,
  setCustomInvoiceTitle,
  customSubtitle,
  setCustomSubtitle,
  selectedCurrency,
  setSelectedCurrency,
  purchaseOrderNumber,
  setPurchaseOrderNumber,
  referenceNumber,
  setReferenceNumber,
  handleClientChange,
  handleItemChange,
  handleAddItem,
  handleRemoveItem
}: InvoiceDetailsStepProps) => {
  const { products = [] } = useProducts();

  return (
    <div className="space-y-4">
      <ClientSelection 
        form={form} 
        clients={clients} 
        handleClientChange={handleClientChange} 
      />

      <InvoiceOptions
        showShippingDetails={showShippingDetails}
        setShowShippingDetails={setShowShippingDetails}
        showTransportDetails={showTransportDetails}
        setShowTransportDetails={setShowTransportDetails}
        showAdditionalFields={showAdditionalFields}
        setShowAdditionalFields={setShowAdditionalFields}
        isGstDialogOpen={isGstDialogOpen}
        setIsGstDialogOpen={setIsGstDialogOpen}
      />

      {showAdditionalFields && (
        <AdditionalFields 
          customInvoiceTitle={customInvoiceTitle}
          setCustomInvoiceTitle={setCustomInvoiceTitle}
          customSubtitle={customSubtitle}
          setCustomSubtitle={setCustomSubtitle}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          purchaseOrderNumber={purchaseOrderNumber}
          setPurchaseOrderNumber={setPurchaseOrderNumber}
          referenceNumber={referenceNumber}
          setReferenceNumber={setReferenceNumber}
        />
      )}

      <InvoiceItems 
        items={items} 
        handleItemChange={handleItemChange} 
        handleAddItem={handleAddItem} 
        handleRemoveItem={handleRemoveItem} 
      />
    </div>
  );
};

export default InvoiceDetailsStep;
