import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface InvoiceOptionsProps {
  showShippingDetails: boolean;
  setShowShippingDetails: (show: boolean) => void;
  showTransportDetails: boolean;
  setShowTransportDetails: (show: boolean) => void;
  showAdditionalFields: boolean;
  setShowAdditionalFields: (show: boolean) => void;
  isGstDialogOpen: boolean;
  setIsGstDialogOpen: (open: boolean) => void;
}

const InvoiceOptions = ({
  showShippingDetails,
  setShowShippingDetails,
  showTransportDetails,
  setShowTransportDetails,
  showAdditionalFields,
  setShowAdditionalFields,
  isGstDialogOpen,
  setIsGstDialogOpen,
}: InvoiceOptionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
      <div className="flex items-center space-x-2">
        <Switch
          checked={showShippingDetails}
          onCheckedChange={setShowShippingDetails}
          id="shipping-details"
        />
        <Label htmlFor="shipping-details">Include Shipping Details</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={showTransportDetails}
          onCheckedChange={setShowTransportDetails}
          id="transport-details"
        />
        <Label htmlFor="transport-details">Include Transport Details</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={showAdditionalFields}
          onCheckedChange={setShowAdditionalFields}
          id="additional-fields"
        />
        <Label htmlFor="additional-fields">Show Additional Fields</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={isGstDialogOpen}
          onCheckedChange={setIsGstDialogOpen}
          id="gst-details"
        />
        <Label htmlFor="gst-details">Include GST Details</Label>
      </div>
    </div>
  );
};

export default InvoiceOptions;
