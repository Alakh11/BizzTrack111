
import React from "react";
import { FileText } from "lucide-react";

const DesignStep: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Design Options */}
        <div className="space-y-6">
          <div className="text-center p-6 border rounded-lg bg-muted/10">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4">
              Design options will be available in the next update
            </p>
          </div>
        </div>

        {/* Design Preview */}
        <div className="text-center p-6 border rounded-lg bg-muted/10">
          <p className="mt-4">Preview will be available in the next update</p>
        </div>
      </div>
    </div>
  );
};

export default DesignStep;
