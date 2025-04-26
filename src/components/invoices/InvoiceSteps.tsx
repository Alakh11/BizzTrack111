
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  name: string;
  description?: string;
}

interface InvoiceStepsProps {
  currentStep: number;
  steps: Step[];
  onChange: (step: number) => void;
}

export function InvoiceSteps({ currentStep, steps, onChange }: InvoiceStepsProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.id} className="md:flex-1">
            <div
              className={cn(
                "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                index < currentStep
                  ? "border-primary"
                  : index === currentStep
                  ? "border-primary"
                  : "border-border"
              )}
            >
              <span className="flex items-center text-sm font-medium">
                <span
                  className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full mr-3",
                    index < currentStep
                      ? "bg-primary text-white"
                      : index === currentStep
                      ? "border-2 border-primary text-primary"
                      : "border-2 border-border text-muted-foreground"
                  )}
                >
                  {index < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>
                <button
                  onClick={() => onChange(index)}
                  className={cn(
                    "text-sm font-medium",
                    index <= currentStep ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </button>
              </span>
              {step.description && (
                <span className="ml-11 text-xs text-muted-foreground">
                  {step.description}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default InvoiceSteps;
