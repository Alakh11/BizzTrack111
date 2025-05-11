import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useClients } from "@/hooks/useClients";
import { useInvoices } from "@/hooks/useInvoices";
import { useInvoiceItems } from "@/hooks/useInvoiceItems";
import { useInvoiceDesign } from "@/hooks/useInvoiceDesign";
import { useInvoiceAdditionalDetails } from "@/hooks/useInvoiceAdditionalDetails";
import { supabase } from "@/integrations/supabase/client";

export const useInvoiceFormCore = () => {
  // Core state
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [finalSubmission, setFinalSubmission] = useState(false);

  // Feature toggles
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [showTransportDetails, setShowTransportDetails] = useState(false);
  const [isGstDialogOpen, setIsGstDialogOpen] = useState(false);

  // Hooks
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { clients = [], isLoading: clientsLoading } = useClients();
  const { createInvoice, updateInvoice, getInvoice } = useInvoices();

  // Feature-specific hooks
  const {
    items,
    setItems,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    calculateTotal,
  } = useInvoiceItems();

  const {
    selectedTemplate,
    setSelectedTemplate,
    selectedColor,
    setSelectedColor,
    selectedFont,
    setSelectedFont,
    selectedPaperSize,
    setSelectedPaperSize,
    businessLogo,
    setBusinessLogo,
    templates,
  } = useInvoiceDesign();

  const {
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
  } = useInvoiceAdditionalDetails();

  // Form definition
  const form = useForm({
    defaultValues: {
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 1000),
      ).padStart(3, "0")}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14))
        .toISOString()
        .split("T")[0],
      clientId: "",
      clientName: "",
      clientAddress: "",
      clientEmail: "",
      clientPhone: "",

      // Business details
      businessName: "Alakh Corporation",
      businessAddress: "Mirzapur, UP, India - 231312",
      businessPhone: "+91 9580813770",
      businessEmail: "alakh1304@gmail.com",

      // Shipping details
      shippedFromName: "",
      shippedFromAddress: "",
      shippedFromCity: "",
      shippedFromState: "",
      shippedFromPostal: "",
      shippedFromCountry: "india",
      shippedFromWarehouse: "",

      shippedToName: "",
      shippedToAddress: "",
      shippedToCity: "",
      shippedToState: "",
      shippedToPostal: "",
      shippedToCountry: "india",

      // Transport details
      transporterName: "",
      distance: "",
      transportMode: "",
      transportDocNo: "",
      transportDocDate: "",
      vehicleType: "",
      vehicleNumber: "",
      transactionType: "",
      supplyType: "",

      // GST details
      taxType: "gst",
      placeOfSupply: "",
      gstType: "",
      gstNumber: "",
      gstReverseCharge: false,
      nonGstClient: false,

      // Payment details - Bank
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      branchName: "",

      // Payment details - UPI
      upiId: "",
      upiName: "",

      notes: "",
      terms: "Payment is due within 14 days of issue.",

      // Design details
      watermarkText: "",
      margins: "normal",
      textScale: "100",

      // Digital signature
      signature: "",

      // Items array for easier access
      items: items,
    },
  });

  // Keep form's items in sync with the items state
  useEffect(() => {
    form.setValue("items", items);
  }, [items, form]);

  return {
    form,
    currentStep,
    setCurrentStep,
    isEditMode,
    setIsEditMode,
    invoiceId,
    setInvoiceId,
    finalSubmission,
    setFinalSubmission,
    toast,
    navigate,
    params,
    location,
    clients,
    clientsLoading,
    createInvoice,
    updateInvoice,
    getInvoice,
    items,
    setItems,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    calculateTotal,
    selectedTemplate,
    setSelectedTemplate,
    selectedColor,
    setSelectedColor,
    selectedFont,
    setSelectedFont,
    selectedPaperSize,
    setSelectedPaperSize,
    businessLogo,
    setBusinessLogo,
    templates,
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
    showShippingDetails,
    setShowShippingDetails,
    showTransportDetails,
    setShowTransportDetails,
    isGstDialogOpen,
    setIsGstDialogOpen,
    supabase,
  };
};
