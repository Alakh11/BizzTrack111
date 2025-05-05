
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface EmailPreviewStepProps {
  form: UseFormReturn<any>;
}

const EmailPreviewStep: React.FC<EmailPreviewStepProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <div className="text-center p-6 border rounded-lg">
        <h3 className="text-lg font-medium">Email Preview</h3>
        <p className="mt-2 text-muted-foreground">
          Email preview will be available in the next update
        </p>
      </div>
    </div>
  );
};

export default EmailPreviewStep;
