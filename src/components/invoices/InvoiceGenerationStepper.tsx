
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Save } from "lucide-react";
import InvoiceSteps from "@/components/invoices/InvoiceSteps";

interface InvoiceGenerationStepperProps {
  steps: {
    id: string;
    name: string;
    description: string;
  }[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isEditMode: boolean;
  handleSubmit: () => void;
  showFinalSubmitButton?: boolean;
  children: React.ReactNode;
}

const InvoiceGenerationStepper = ({
  steps,
  currentStep,
  setCurrentStep,
  isEditMode,
  handleSubmit,
  showFinalSubmitButton = true,
  children,
}: InvoiceGenerationStepperProps) => {
  const navigate = useNavigate();

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      handleSubmit();
    } else {
      const nextStep = Math.min(currentStep + 1, steps.length - 1);
      setCurrentStep(nextStep);
    }
  };

  const handlePrevious = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    setCurrentStep(prevStep);
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="space-y-6">
      <InvoiceSteps
        currentStep={currentStep}
        steps={steps}
        onStepChange={handleStepChange}
      />

      <div>{children}</div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/invoices")}
          >
            Cancel
          </Button>

          {isLastStep && showFinalSubmitButton ? (
            <Button type="button" onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />
              {isEditMode ? "Update Invoice" : "Save Invoice"}
            </Button>
          ) : (
            <Button type="button" onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerationStepper;
