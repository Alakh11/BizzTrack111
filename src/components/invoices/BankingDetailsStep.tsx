
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PaymentOptionsForm from "./PaymentOptionsForm";

interface BankingDetailsStepProps {
  form: UseFormReturn<any>;
}

const BankingDetailsStep: React.FC<BankingDetailsStepProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <PaymentOptionsForm form={form} />
    </div>
  );
};

export default BankingDetailsStep;
