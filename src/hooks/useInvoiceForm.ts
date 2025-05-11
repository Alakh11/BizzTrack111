import { useEffect } from "react";
import { useInvoiceFormCore } from "./useInvoiceFormCore";
import { useInvoiceFormUpdater } from "./useInvoiceFormUpdater";

// This hook now only handles form setup and data preparation,
// while delegating the actual update operations to useInvoiceFormUpdater
export const useInvoiceForm = () => {
  const core = useInvoiceFormCore();
  const formUpdater = useInvoiceFormUpdater();

  const {
    form,
    setItems,
    setIsEditMode,
    setInvoiceId,
    params,
    location,
    getInvoice,
    toast,
    navigate,
    setSelectedTemplate,
    setSelectedColor,
    setSelectedFont,
    setSelectedPaperSize,
    setBusinessLogo,
    setShowShippingDetails,
    setShowTransportDetails,
    setShowAdditionalFields,
    setCustomInvoiceTitle,
    setPurchaseOrderNumber,
    setReferenceNumber,
    setSelectedCurrency,
    supabase,
  } = core;

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

            // Set invoice items with proper ids for editing
            if (
              invoiceData.invoice_items &&
              invoiceData.invoice_items.length > 0
            ) {
              const mappedItems = invoiceData.invoice_items.map(
                (item: any, index: number) => ({
                  id: index + 1,
                  description: item.description || "",
                  quantity: item.quantity || 0,
                  rate: item.unit_price || 0,
                  amount: item.amount || 0,
                  serviceId: item.service_id || "",
                }),
              );

              setItems(mappedItems);
            }

            // Parse and apply metadata
            if (invoiceData.metadata) {
              try {
                const metadata =
                  typeof invoiceData.metadata === "string"
                    ? JSON.parse(invoiceData.metadata)
                    : invoiceData.metadata;

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
        form.setValue(
          "shippedFromAddress",
          metadata.shipping.from.address || "",
        );
        form.setValue("shippedFromCity", metadata.shipping.from.city || "");
        form.setValue("shippedFromState", metadata.shipping.from.state || "");
        form.setValue("shippedFromPostal", metadata.shipping.from.postal || "");
        form.setValue(
          "shippedFromCountry",
          metadata.shipping.from.country || "india",
        );
        form.setValue(
          "shippedFromWarehouse",
          metadata.shipping.from.warehouse || "",
        );
      }

      if (metadata.shipping.to) {
        form.setValue("shippedToName", metadata.shipping.to.name || "");
        form.setValue("shippedToAddress", metadata.shipping.to.address || "");
        form.setValue("shippedToCity", metadata.shipping.to.city || "");
        form.setValue("shippedToState", metadata.shipping.to.state || "");
        form.setValue("shippedToPostal", metadata.shipping.to.postal || "");
        form.setValue(
          "shippedToCountry",
          metadata.shipping.to.country || "india",
        );
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
      form.setValue(
        "transactionType",
        metadata.transport.transactionType || "",
      );
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
        form.setValue(
          "accountNumber",
          metadata.payment.bank.accountNumber || "",
        );
        form.setValue("ifscCode", metadata.payment.bank.ifscCode || "");
        form.setValue(
          "accountHolderName",
          metadata.payment.bank.accountHolderName || "",
        );
        form.setValue("branchName", metadata.payment.bank.branchName || "");
      }

      if (metadata.payment.upi) {
        form.setValue("upiId", metadata.payment.upi.id || "");
        form.setValue("upiName", metadata.payment.upi.name || "");
      }
    }
  };

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
  }, [form, supabase]);

  const handleClientChange = (clientId: string) => {
    const selectedClient = core.clients.find((c) => c.id === clientId);
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
        template: core.selectedTemplate,
        color: core.selectedColor,
        font: core.selectedFont,
        paperSize: core.selectedPaperSize,
        title: core.customInvoiceTitle,
        subtitle: core.customSubtitle,
        logo: core.businessLogo,
        signature: data.signature || "",
      },
      additional: {
        poNumber: core.purchaseOrderNumber,
        refNumber: core.referenceNumber,
        currency: core.selectedCurrency,
      },
      shipping: core.showShippingDetails
        ? {
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
            },
          }
        : null,
      transport: core.showTransportDetails
        ? {
            transporter: data.transporterName,
            distance: data.distance,
            mode: data.transportMode,
            docNo: data.transportDocNo,
            docDate: data.transportDocDate,
            vehicleType: data.vehicleType,
            vehicleNumber: data.vehicleNumber,
            transactionType: data.transactionType,
            supplyType: data.supplyType,
          }
        : null,
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
        },
      },
    };
  };

  // Optimized handleFormSubmit with improved error handling to prevent freezes
  const handleFormSubmit = async (data: any) => {
    // Only proceed if finalSubmission is true or we're on the last step
    if (!core.finalSubmission && core.currentStep !== 3) {
      // If we're not on the final step and not in final submission, just go to next step
      core.setCurrentStep(core.currentStep + 1);
      return;
    }

    try {
      // Calculate total
      const totalAmount = core.calculateTotal();

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
      const invoiceItems = core.items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unit_price: item.rate,
        amount: item.amount,
        service_id: item.serviceId || null,
      }));

      // Show loading toast
      toast({
        title: core.isEditMode ? "Updating invoice..." : "Creating invoice...",
        description: "Please wait while we process your request.",
      });

      let result;

      try {
        if (core.isEditMode && core.invoiceId) {
          result = await formUpdater.updateInvoice(
            core.invoiceId,
            invoiceData,
            invoiceItems,
          );
        } else if (core.finalSubmission) {
          const userData = (await supabase.auth.getUser()).data.user;
          if (userData) {
            result = await formUpdater.createInvoice(
              { ...invoiceData, user_id: userData.id },
              invoiceItems,
            );
          }
        }

        if (result) {
          // Add a short delay for better UX before navigating
          setTimeout(() => {
            navigate("/invoices");
          }, 300);
        }
      } catch (error: any) {
        console.error("Operation error:", error);
        toast({
          title: "Error",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Form error:", error);
      toast({
        title: core.isEditMode
          ? "Error updating invoice"
          : "Error creating invoice",
        description:
          error.message ||
          `An error occurred while ${core.isEditMode ? "updating" : "creating"} the invoice`,

        variant: "destructive",
      });
    }
  };

  // Organize props by feature for easier component consumption
  const invoiceDetailsProps = {
    form,
    clients: core.clients || [],
    items: core.items,
    showShippingDetails: core.showShippingDetails,
    setShowShippingDetails: core.setShowShippingDetails,
    showTransportDetails: core.showTransportDetails,
    setShowTransportDetails: core.setShowTransportDetails,
    isGstDialogOpen: core.isGstDialogOpen,
    setIsGstDialogOpen: core.setIsGstDialogOpen,
    showAdditionalFields: core.showAdditionalFields,
    setShowAdditionalFields: core.setShowAdditionalFields,
    customInvoiceTitle: core.customInvoiceTitle,
    setCustomInvoiceTitle: core.setCustomInvoiceTitle,
    customSubtitle: core.customSubtitle,
    setCustomSubtitle: core.setCustomSubtitle,
    selectedCurrency: core.selectedCurrency,
    setSelectedCurrency: core.setSelectedCurrency,
    purchaseOrderNumber: core.purchaseOrderNumber,
    setPurchaseOrderNumber: core.setPurchaseOrderNumber,
    referenceNumber: core.referenceNumber,
    setReferenceNumber: core.setReferenceNumber,
    handleClientChange,
    handleItemChange: core.handleItemChange,
    handleAddItem: core.handleAddItem,
    handleRemoveItem: core.handleRemoveItem,
    calculateTotal: core.calculateTotal,
  };

  const designProps = {
    selectedTemplate: core.selectedTemplate,
    selectedColor: core.selectedColor,
    selectedFont: core.selectedFont,
    selectedPaperSize: core.selectedPaperSize,
    businessLogo: core.businessLogo,
    setSelectedTemplate: core.setSelectedTemplate,
    setSelectedColor: core.setSelectedColor,
    setSelectedFont: core.setSelectedFont,
    setSelectedPaperSize: core.setSelectedPaperSize,
    setBusinessLogo: core.setBusinessLogo,
    templates: core.templates,
  };

  const renderingProps = {
    isEditMode: core.isEditMode,
    invoiceId: core.invoiceId,
  };

  return {
    // Core form functionality
    form,
    currentStep: core.currentStep,
    setCurrentStep: core.setCurrentStep,
    isEditMode: core.isEditMode,
    invoiceId: core.invoiceId,
    finalSubmission: core.finalSubmission,
    setFinalSubmission: core.setFinalSubmission,
    handleFormSubmit,

    // Data
    items: core.items,
    clients: core.clients,
    clientsLoading: core.clientsLoading,

    // Feature flags
    showShippingDetails: core.showShippingDetails,
    setShowShippingDetails: core.setShowShippingDetails,
    showTransportDetails: core.showTransportDetails,
    setShowTransportDetails: core.setShowTransportDetails,
    isGstDialogOpen: core.isGstDialogOpen,
    setIsGstDialogOpen: core.setIsGstDialogOpen,
    showAdditionalFields: core.showAdditionalFields,
    setShowAdditionalFields: core.setShowAdditionalFields,

    // Design settings
    customInvoiceTitle: core.customInvoiceTitle,
    setCustomInvoiceTitle: core.setCustomInvoiceTitle,
    customSubtitle: core.customSubtitle,
    setCustomSubtitle: core.setCustomSubtitle,
    selectedCurrency: core.selectedCurrency,
    setSelectedCurrency: core.setSelectedCurrency,
    purchaseOrderNumber: core.purchaseOrderNumber,
    setPurchaseOrderNumber: core.setPurchaseOrderNumber,
    referenceNumber: core.referenceNumber,
    setReferenceNumber: core.setReferenceNumber,
    selectedTemplate: core.selectedTemplate,
    selectedColor: core.selectedColor,
    selectedFont: core.selectedFont,
    selectedPaperSize: core.selectedPaperSize,
    businessLogo: core.businessLogo,
    setSelectedTemplate: core.setSelectedTemplate,
    setSelectedColor: core.setSelectedColor,
    setSelectedFont: core.setSelectedFont,
    setSelectedPaperSize: core.setSelectedPaperSize,
    setBusinessLogo: core.setBusinessLogo,
    templates: core.templates,

    // Handler functions
    handleClientChange,
    handleItemChange: core.handleItemChange,
    handleAddItem: core.handleAddItem,
    handleRemoveItem: core.handleRemoveItem,
    calculateTotal: core.calculateTotal,

    // Grouped props for components
    invoiceDetailsProps,
    designProps,
    renderingProps,
  };
};
