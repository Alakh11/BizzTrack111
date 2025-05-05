
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface BankingDetailsStepProps {
  form: UseFormReturn<any>;
}

const BankingDetailsStep: React.FC<BankingDetailsStepProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <div className="text-center p-6 border rounded-lg">
        <h3 className="text-lg font-medium">Banking Details</h3>
        <p className="mt-2 text-muted-foreground">
          Banking details will be available in the next update
        </p>
      </div>
    </div>
  );
};

export default BankingDetailsStep;
