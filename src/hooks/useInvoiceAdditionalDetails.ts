import { useState } from "react";

export const useInvoiceAdditionalDetails = () => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [customInvoiceTitle, setCustomInvoiceTitle] = useState("INVOICE");
  const [customSubtitle, setCustomSubtitle] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("inr");
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  return {
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
  };
};
