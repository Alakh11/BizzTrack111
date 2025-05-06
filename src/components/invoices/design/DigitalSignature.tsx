
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface DigitalSignatureProps {
  form: UseFormReturn<any>;
}

const DigitalSignature: React.FC<DigitalSignatureProps> = ({ form }) => {
  return (
    <Card className="w-full">
      <CardHeader className="py-3">
        <CardTitle className="text-sm">Digital Signature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-gray-200">Signature</label>
          <textarea
            className="w-full rounded-md border p-2 h-20 dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white"
            placeholder="Type your name to create a digital signature"
            {...form.register("signature")}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalSignature;
