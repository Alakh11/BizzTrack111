
import MainLayout from "@/components/layout/MainLayout";
import MultiStepInvoiceForm from "@/components/invoices/MultiStepInvoiceForm";

const InvoiceGeneration = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <MultiStepInvoiceForm />
      </div>
    </MainLayout>
  );
};

export default InvoiceGeneration;
