
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import MainLayout from "@/components/layout/MainLayout";
import InvoiceDetailsStep from "@/components/invoices/InvoiceDetailsStep";
import BankingDetailsStep from "@/components/invoices/BankingDetailsStep";
import DesignStep from "@/components/invoices/DesignStep";
import InvoiceGenerationStepper from "@/components/invoices/InvoiceGenerationStepper";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import EmailPreviewStep from "@/components/invoices/EmailPreviewStep";

const steps = [
  {
    id: "details",
    name: "Add Invoice Details",
    description: "Client info and invoice details",
  },
  {
    id: "banking",
    name: "Add Banking Details",
    description: "Payment information",
  },
  {
    id: "design",
    name: "Design & Share",
    description: "Customize and send",
  },
  {
    id: "preview",
    name: "Preview & Send",
    description: "Review and send",
  },
];

const InvoiceGeneration = () => {
  const { 
    form,
    currentStep,
    setCurrentStep,
    isEditMode,
    handleFormSubmit
  } = useInvoiceForm();

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Invoice Details
        return <InvoiceDetailsStep />;
      case 1: // Banking Details
        return <BankingDetailsStep form={form} />;
      case 2: // Design and Share
        return <DesignStep />;
      case 3: // Preview and Send
        return <EmailPreviewStep />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-playfair">
              {isEditMode ? "Edit Invoice" : "Create New Invoice"}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode
                ? "Update invoice details, items, and design"
                : "Create a new invoice for your clients"}
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <InvoiceGenerationStepper
                  steps={steps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  isEditMode={isEditMode}
                  handleSubmit={form.handleSubmit(handleFormSubmit)}
                >
                  {renderStepContent()}
                </InvoiceGenerationStepper>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InvoiceGeneration;
