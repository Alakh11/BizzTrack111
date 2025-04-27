
import React from "react";
import { Input } from "@/components/ui/input";

interface InvoiceHeaderProps {
  customInvoiceTitle: string;
  customSubtitle: string;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  customInvoiceTitle,
  customSubtitle,
  onTitleChange,
  onSubtitleChange,
}) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Input
            className="text-2xl font-bold border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-playfair"
            value={customInvoiceTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="INVOICE"
          />
        </div>
        <div>
          <Input
            className="text-sm text-muted-foreground border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={customSubtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
            placeholder="Add Subtitle (Optional)"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;
