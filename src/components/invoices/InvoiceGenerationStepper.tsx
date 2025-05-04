
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
  children: React.ReactNode;
}

const InvoiceGenerationStepper = ({
  steps,
  currentStep,
  setCurrentStep,
  isEditMode,
  handleSubmit,
  children,
}: InvoiceGenerationStepperProps) => {
  const navigate = useNavigate();

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <InvoiceSteps
        currentStep={currentStep}
        steps={steps}
        onChange={handleStepChange}
      />
      
      {children}

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/invoices")}
          >
            Cancel
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit}>
              {isEditMode ? "Update Invoice" : "Save Invoice"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default InvoiceGenerationStepper;
