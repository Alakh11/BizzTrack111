
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

export const useInvoiceForm = () => {
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
    calculateTotal 
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
    templates
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
    setReferenceNumber
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
      items: items
    },
  });

  // Keep form's items in sync with the items state
  useEffect(() => {
    form.setValue("items", items);
  }, [items, form]);

  // Check if we're in edit mode
  useEffect(() => {
    const fetchInvoice = async () => {
      if (params.id) {
        try {
          setIsEditMode(true);
          setInvoiceId(params.id);

          // Try to get invoice from location state first (for better UX)
          let invoiceData;
          if (location.state?.invoice) {
            invoiceData = location.state.invoice;
          } else {
            // Fetch from API if not in state
            invoiceData = await getInvoice(params.id);
          }

          if (invoiceData) {
            // Set form values
            form.setValue("invoiceNumber", invoiceData.invoice_number);
            form.setValue("invoiceDate", invoiceData.invoice_date);
            form.setValue("dueDate", invoiceData.due_date);
            form.setValue("clientId", invoiceData.client_id || "");
            form.setValue("notes", invoiceData.notes || "");
            form.setValue("terms", invoiceData.terms || "");

            // Set client details if available
            if (invoiceData.client) {
              form.setValue("clientName", invoiceData.client.name || "");
              form.setValue("clientAddress", invoiceData.client.address || "");
              form.setValue("clientEmail", invoiceData.client.email || "");
              form.setValue("clientPhone", invoiceData.client.phone || "");
            }

            // Set invoice items
            if (
              invoiceData.invoice_items &&
              invoiceData.invoice_items.length > 0
            ) {
              setItems(
                invoiceData.invoice_items.map((item: any, index: number) => ({
                  id: index + 1,
                  description: item.description,
                  quantity: item.quantity,
                  rate: item.unit_price,
                  amount: item.amount,
                  serviceId: item.service_id || "",
                })),
              );
            }

            // Parse and apply metadata
            if (invoiceData.metadata) {
              try {
                const metadata = JSON.parse(invoiceData.metadata);
                applyMetadataToForm(metadata);
              } catch (e) {
                console.error("Error parsing invoice metadata", e);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching invoice:", error);
          toast({
            title: "Error",
            description: "Could not load invoice for editing",
            variant: "destructive",
          });
          navigate("/invoices");
        }
      }
    };

    fetchInvoice();
  }, [params.id, form, navigate, toast, getInvoice, location.state, setItems]);

  // Apply metadata to form
  const applyMetadataToForm = (metadata: any) => {
    // Design settings
    if (metadata.design) {
      setSelectedTemplate(metadata.design.template || "standard");
      setSelectedColor(metadata.design.color || "blue");
      setSelectedFont(metadata.design.font || "inter");
      setCustomInvoiceTitle(metadata.design.title || "INVOICE");
      setBusinessLogo(metadata.design.logo || "");
      
      if (metadata.design.paperSize) {
        setSelectedPaperSize(metadata.design.paperSize);
      }
      
      if (metadata.design.signature) {
        form.setValue("signature", metadata.design.signature);
      }
    }
    
    // Shipping details
    if (metadata.shipping) {
      setShowShippingDetails(true);
      
      if (metadata.shipping.from) {
        form.setValue("shippedFromName", metadata.shipping.from.name || "");
        form.setValue("shippedFromAddress", metadata.shipping.from.address || "");
        form.setValue("shippedFromCity", metadata.shipping.from.city || "");
        form.setValue("shippedFromState", metadata.shipping.from.state || "");
        form.setValue("shippedFromPostal", metadata.shipping.from.postal || "");
        form.setValue("shippedFromCountry", metadata.shipping.from.country || "india");
        form.setValue("shippedFromWarehouse", metadata.shipping.from.warehouse || "");
      }
      
      if (metadata.shipping.to) {
        form.setValue("shippedToName", metadata.shipping.to.name || "");
        form.setValue("shippedToAddress", metadata.shipping.to.address || "");
        form.setValue("shippedToCity", metadata.shipping.to.city || "");
        form.setValue("shippedToState", metadata.shipping.to.state || "");
        form.setValue("shippedToPostal", metadata.shipping.to.postal || "");
        form.setValue("shippedToCountry", metadata.shipping.to.country || "india");
      }
    }
    
    // Transport details
    if (metadata.transport) {
      setShowTransportDetails(true);
      form.setValue("transporterName", metadata.transport.transporter || "");
      form.setValue("distance", metadata.transport.distance || "");
      form.setValue("transportMode", metadata.transport.mode || "");
      form.setValue("transportDocNo", metadata.transport.docNo || "");
      form.setValue("transportDocDate", metadata.transport.docDate || "");
      form.setValue("vehicleType", metadata.transport.vehicleType || "");
      form.setValue("vehicleNumber", metadata.transport.vehicleNumber || "");
      form.setValue("transactionType", metadata.transport.transactionType || "");
      form.setValue("supplyType", metadata.transport.supplyType || "");
    }
    
    // Additional details
    if (metadata.additional) {
      setPurchaseOrderNumber(metadata.additional.poNumber || "");
      setReferenceNumber(metadata.additional.refNumber || "");
      setSelectedCurrency(metadata.additional.currency || "inr");
      if (metadata.additional.poNumber || metadata.additional.refNumber) {
        setShowAdditionalFields(true);
      }
    }
    
    // GST details
    if (metadata.gst) {
      form.setValue("taxType", metadata.gst.type || "gst");
      form.setValue("placeOfSupply", metadata.gst.placeOfSupply || "");
      form.setValue("gstType", metadata.gst.gstType || "");
      form.setValue("gstNumber", metadata.gst.gstNumber || "");
      form.setValue("gstReverseCharge", metadata.gst.reverseCharge || false);
      form.setValue("nonGstClient", metadata.gst.nonGstClient || false);
    }
    
    // Payment/banking details
    if (metadata.payment) {
      if (metadata.payment.bank) {
        form.setValue("bankName", metadata.payment.bank.name || "");
        form.setValue("accountNumber", metadata.payment.bank.accountNumber || "");
        form.setValue("ifscCode", metadata.payment.bank.ifscCode || "");
        form.setValue("accountHolderName", metadata.payment.bank.accountHolderName || "");
        form.setValue("branchName", metadata.payment.bank.branchName || "");
      }
      
      if (metadata.payment.upi) {
        form.setValue("upiId", metadata.payment.upi.id || "");
        form.setValue("upiName", metadata.payment.upi.name || "");
      }
    }
  }

  // Fetch business profile data
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileData) {
            // Set business details from profile
            if (profileData.business_name) {
              form.setValue("businessName", profileData.business_name);
            }
            if (profileData.business_address) {
              form.setValue("businessAddress", profileData.business_address);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchBusinessProfile();
  }, [form]);

  const handleClientChange = (clientId: string) => {
    const selectedClient = clients.find((c) => c.id === clientId);
    if (selectedClient) {
      form.setValue("clientId", clientId);
      form.setValue("clientName", selectedClient.name);
      form.setValue("clientAddress", selectedClient.address || "");
      form.setValue("clientEmail", selectedClient.email || "");
      form.setValue("clientPhone", selectedClient.phone || "");
    }
  };

  // Create metadata object from form and state values
  const createMetadata = (data: any) => {
    return {
      design: {
        template: selectedTemplate,
        color: selectedColor,
        font: selectedFont,
        paperSize: selectedPaperSize,
        title: customInvoiceTitle,
        subtitle: customSubtitle,
        logo: businessLogo,
        signature: data.signature || "",
      },
      additional: {
        poNumber: purchaseOrderNumber,
        refNumber: referenceNumber,
        currency: selectedCurrency,
      },
      shipping: showShippingDetails ? {
        from: {
          name: data.shippedFromName,
          address: data.shippedFromAddress,
          city: data.shippedFromCity,
          state: data.shippedFromState,
          postal: data.shippedFromPostal,
          country: data.shippedFromCountry,
          warehouse: data.shippedFromWarehouse,
        },
        to: {
          name: data.shippedToName,
          address: data.shippedToAddress,
          city: data.shippedToCity,
          state: data.shippedToState,
          postal: data.shippedToPostal,
          country: data.shippedToCountry,
        }
      } : null,
      transport: showTransportDetails ? {
        transporter: data.transporterName,
        distance: data.distance,
        mode: data.transportMode,
        docNo: data.transportDocNo,
        docDate: data.transportDocDate,
        vehicleType: data.vehicleType,
        vehicleNumber: data.vehicleNumber,
        transactionType: data.transactionType,
        supplyType: data.supplyType,
      } : null,
      gst: {
        type: data.taxType,
        placeOfSupply: data.placeOfSupply,
        gstType: data.gstType,
        gstNumber: data.gstNumber,
        reverseCharge: data.gstReverseCharge,
        nonGstClient: data.nonGstClient,
      },
      payment: {
        bank: {
          name: data.bankName,
          accountNumber: data.accountNumber,
          ifscCode: data.ifscCode,
          accountHolderName: data.accountHolderName,
          branchName: data.branchName,
        },
        upi: {
          id: data.upiId,
          name: data.upiName,
        }
      }
    };
  };

  // Modified handleFormSubmit to ensure shipping and transport details are saved
  const handleFormSubmit = async (data: any) => {
    // Only proceed if finalSubmission is true or we're on the last step
    if (!finalSubmission && currentStep !== 3) {
      // If we're not on the final step and not in final submission, just go to next step
      setCurrentStep(currentStep + 1);
      return;
    }
    
    try {
      // Calculate total
      const totalAmount = calculateTotal();
      
      // Create metadata
      const metadata = createMetadata(data);

      // Prepare invoice data
      const invoiceData = {
        invoice_number: data.invoiceNumber,
        invoice_date: data.invoiceDate,
        due_date: data.dueDate,
        total_amount: totalAmount,
        client_id: data.clientId || null,
        notes: data.notes,
        terms: data.terms,
        status: "pending",
        metadata: JSON.stringify(metadata),
      };

      // Prepare invoice items
      const invoiceItems = items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unit_price: item.rate,
        amount: item.amount,
        service_id: item.serviceId || null,
      }));

      if (isEditMode && invoiceId) {
        // Update existing invoice
        await updateInvoice.mutateAsync({
          id: invoiceId,
          invoiceData: {
            ...invoiceData,
            invoice_items: invoiceItems,
          },
        });

        toast({
          title: "Invoice updated",
          description: "Your invoice has been updated successfully.",
        });
        
        navigate("/invoices");
      } else if (finalSubmission) {
        // Only create the invoice if this is the final submission
        // Check for unique invoice number first
        const { data: existingInvoices } = await supabase
          .from("invoices")
          .select("id")
          .eq("invoice_number", data.invoiceNumber)
          .limit(1);
          
        if (existingInvoices && existingInvoices.length > 0) {
          toast({
            title: "Duplicate Invoice Number",
            description: "This invoice number already exists. Please use a unique number.",
            variant: "destructive",
          });
          return;
        }
        
        // Create new invoice
        const result = await createInvoice.mutateAsync(invoiceData);

        // If invoice was created successfully, add invoice items
        if (result && result.id) {
          // Insert invoice items
          await supabase.from("invoice_items").insert(
            invoiceItems.map((item) => ({
              ...item,
              invoice_id: result.id,
            })),
          );

          toast({
            title: "Invoice created",
            description: "Your invoice has been created successfully.",
          });
          
          navigate("/invoices");
        }
      }
    } catch (error: any) {
      console.error("Error with invoice:", error);
      toast({
        title: isEditMode ? "Error updating invoice" : "Error creating invoice",
        description:
          error.message ||
          `An error occurred while ${isEditMode ? "updating" : "creating"} the invoice`,
        variant: "destructive",
      });
    }
  };

  // Organize props by feature for easier component consumption
  const invoiceDetailsProps = {
    form,
    clients: clients || [],
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
    handleRemoveItem,
    calculateTotal,
  };

  const designProps = {
    selectedTemplate,
    selectedColor,
    selectedFont,
    selectedPaperSize,
    businessLogo,
    setSelectedTemplate,
    setSelectedColor,
    setSelectedFont,
    setSelectedPaperSize,
    setBusinessLogo,
    templates,
  };

  const renderingProps = {
    isEditMode,
    invoiceId,
  };

  return {
    // Core form functionality
    form,
    currentStep,
    setCurrentStep,
    isEditMode,
    invoiceId,
    finalSubmission,
    setFinalSubmission,
    handleFormSubmit,
    
    // Data
    items,
    clients,
    clientsLoading,
    
    // Feature flags
    showShippingDetails,
    setShowShippingDetails,
    showTransportDetails,
    setShowTransportDetails,
    isGstDialogOpen,
    setIsGstDialogOpen,
    showAdditionalFields,
    setShowAdditionalFields,
    
    // Design settings
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
    selectedTemplate,
    selectedColor,
    selectedFont,
    selectedPaperSize,
    businessLogo,
    setSelectedTemplate,
    setSelectedColor,
    setSelectedFont,
    setSelectedPaperSize,
    setBusinessLogo,
    templates,
    
    // Handler functions
    handleClientChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    calculateTotal,
    
    // Grouped props for components
    invoiceDetailsProps,
    designProps,
    renderingProps,
  };
};
