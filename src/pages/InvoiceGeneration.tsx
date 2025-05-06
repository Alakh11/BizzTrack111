
import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import InvoiceGenerationStepper from "@/components/invoices/InvoiceGenerationStepper";
import InvoiceDetailsStep from "@/components/invoices/InvoiceDetailsStep";
import DesignStep from "@/components/invoices/DesignStep";
import BankingDetailsStep from "@/components/invoices/BankingDetailsStep";
import EmailPreviewStep from "@/components/invoices/EmailPreviewStep";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";

const steps = [
  {
    id: "details",
    name: "Invoice Details",
    description: "Basic information about the invoice",
  },
  {
    id: "banking",
    name: "Banking Details",
    description: "Add payment information",
  },
  {
    id: "design",
    name: "Design & Share",
    description: "Customize the look and feel",
  },
  {
    id: "preview",
    name: "Email & Preview",
    description: "Review and finalize",
  },
];

const InvoiceGeneration = () => {
  const {
    form,
    currentStep,
    setCurrentStep,
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
    isEditMode,
    invoiceId,
    clients,
    clientsLoading,
    handleClientChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    calculateTotal,
    handleFormSubmit,
    setFinalSubmission,
  } = useInvoiceForm();

  // Wrapper for form submission
  const onSubmit = () => {
    // Only set finalSubmission to true if we're on the last step
    if (currentStep === steps.length - 1) {
      setFinalSubmission(true);
      form.handleSubmit(handleFormSubmit)();
    } else {
      form.handleSubmit(handleFormSubmit)();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <InvoiceDetailsStep
            form={form}
            clients={clients || []}
            items={items}
            showShippingDetails={showShippingDetails}
            setShowShippingDetails={setShowShippingDetails}
            showTransportDetails={showTransportDetails}
            setShowTransportDetails={setShowTransportDetails}
            isGstDialogOpen={isGstDialogOpen}
            setIsGstDialogOpen={setIsGstDialogOpen}
            showAdditionalFields={showAdditionalFields}
            setShowAdditionalFields={setShowAdditionalFields}
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
            handleClientChange={handleClientChange}
            handleItemChange={handleItemChange}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            calculateTotal={calculateTotal}
          />
        );
      case 1:
        return <BankingDetailsStep form={form} />;
      case 2:
        return (
          <DesignStep
            form={form}
            selectedTemplate={selectedTemplate}
            selectedColor={selectedColor}
            selectedFont={selectedFont}
            selectedPaperSize={selectedPaperSize}
            businessLogo={businessLogo}
            setSelectedTemplate={setSelectedTemplate}
            setSelectedColor={setSelectedColor}
            setSelectedFont={setSelectedFont}
            setSelectedPaperSize={setSelectedPaperSize}
            setBusinessLogo={setBusinessLogo}
          />
        );
      case 3:
        return <EmailPreviewStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Invoice" : "Create New Invoice"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? `You are editing invoice ${invoiceId}`
              : "Enter the details to create a new invoice"}
          </p>
        </div>

        <Card className="p-6">
          <FormProvider {...form}>
            <InvoiceGenerationStepper
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isEditMode={isEditMode}
              handleSubmit={onSubmit}
              showFinalSubmitButton={true}
            >
              {renderStep()}
            </InvoiceGenerationStepper>
          </FormProvider>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InvoiceGeneration;
