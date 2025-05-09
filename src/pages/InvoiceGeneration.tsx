
import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import InvoiceGenerationStepper from "@/components/invoices/InvoiceGenerationStepper";
import InvoiceDetailsStep from "@/components/invoices/InvoiceDetailsStep";
import BankingDetailsStep from "@/components/invoices/BankingDetailsStep";
import DesignStep from "@/components/invoices/DesignStep";
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

// Add global styles for dark mode inputs with improved visibility
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
  .dark input, .dark textarea, .dark select {
    background-color: rgb(17, 24, 39) !important;
    color: white !important;
    border-color: rgb(55, 65, 81) !important;
  }
  .dark input::placeholder, .dark textarea::placeholder, .dark select::placeholder {
    color: rgb(156, 163, 175) !important;
  }
  .dark .bg-muted {
    background-color: rgb(31, 41, 55) !important;
  }
  .dark input[type=number] {
    color: white !important;
  }
  .dark input[readonly] {
    opacity: 0.7;
  }
`;
document.head.appendChild(darkModeStyles);

const InvoiceGeneration = () => {
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
  const {
    form,
    currentStep,
    setCurrentStep,
    isEditMode,
    invoiceId,
    handleFormSubmit,
    setFinalSubmission,
    // Group related props together
    invoiceDetailsProps,
    designProps,
    renderingProps,
  } = useInvoiceForm();

  // Wrapper for form submission
  const onSubmit = () => {
    setFormSubmitAttempted(true);
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
        return <InvoiceDetailsStep {...invoiceDetailsProps} />;
      case 1:
        return <BankingDetailsStep form={form} />;
      case 2:
        return <DesignStep form={form} {...designProps} />;
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

        <Card className="p-6 dark:bg-gray-900/50">
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