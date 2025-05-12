
import MainLayout from "@/components/layout/MainLayout";

const Billing = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-muted-foreground">
            Create invoices and process payments for your products and services.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Billing Dashboard</h2>
          <p>
            This section allows you to manage your billing operations,
            including product sales, invoice generation, and payment processing.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Billing;
