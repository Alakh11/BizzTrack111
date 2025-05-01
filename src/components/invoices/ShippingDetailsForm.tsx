
import React, { useState } from "react";
import ShippingAddressSection from "../shipping/ShippingAddressSection";

interface ShippingDetailsFormProps {
  form: any;
  clientName?: string;
  clientAddress?: string;
}

const ShippingDetailsForm: React.FC<ShippingDetailsFormProps> = ({
  form,
  clientName,
  clientAddress,
}) => {
  const [showExtraFromFields, setShowExtraFromFields] = useState(false);
  const [showExtraToFields, setShowExtraToFields] = useState(false);
  const [useBusinessAddress, setUseBusinessAddress] = useState(false);
  const [useClientAddress, setUseClientAddress] = useState(false);
  
  const handleUseBusinessAddress = (checked: boolean) => {
    setUseBusinessAddress(checked);
    if (checked) {
      form.setValue("shippedFromName", form.getValues("businessName"));
      form.setValue("shippedFromAddress", form.getValues("businessAddress"));
    } else {
      form.setValue("shippedFromName", "");
      form.setValue("shippedFromAddress", "");
    }
  };
  
  const handleUseClientAddress = (checked: boolean) => {
    setUseClientAddress(checked);
    if (checked) {
      form.setValue("shippedToName", clientName);
      form.setValue("shippedToAddress", clientAddress);
    } else {
      form.setValue("shippedToName", "");
      form.setValue("shippedToAddress", "");
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipped From */}
        <ShippingAddressSection
          form={form}
          type="from"
          title="Shipped From"
          useSourceAddress={useBusinessAddress}
          setUseSourceAddress={handleUseBusinessAddress}
          sourceLabel="Same as your business address"
          showExtra={showExtraFromFields}
          setShowExtra={setShowExtraFromFields}
        />
        
        {/* Shipped To */}
        <ShippingAddressSection
          form={form}
          type="to"
          title="Shipped To"
          addressSource={{
            name: clientName,
            address: clientAddress
          }}
          useSourceAddress={useClientAddress}
          setUseSourceAddress={handleUseClientAddress}
          sourceLabel="Same as client's address"
          showExtra={showExtraToFields}
          setShowExtra={setShowExtraToFields}
        />
      </div>
    </div>
  );
};

export default ShippingDetailsForm;
