
import React from "react";
import { Button } from "@/components/ui/button";
import TransportFormSection from "../transport/TransportFormSection";

interface TransportDetailsFormProps {
  form: any;
}

const TransportDetailsForm: React.FC<TransportDetailsFormProps> = ({ form }) => {
  const handleCalculateDistance = () => {
    // This would integrate with a maps API to calculate distance
    console.log("Calculate distance");
  };

  const transporterFields = [
    {
      name: "transporterName",
      label: "Select Transporter",
      type: "select" as const,
      options: [
        { value: "bluedart", label: "BlueDart" },
        { value: "dhl", label: "DHL" },
        { value: "fedex", label: "FedEx" },
        { value: "dtdc", label: "DTDC" },
        { value: "other", label: "Other" }
      ]
    },
    {
      name: "distance",
      label: "Distance (in Km)",
      type: "input" as const,
      buttonText: "Calculate",
      onButtonClick: handleCalculateDistance
    }
  ];

  const transportModeFields = [
    {
      name: "transportMode",
      label: "Add Mode of Transport",
      type: "select" as const,
      options: [
        { value: "road", label: "Road" },
        { value: "rail", label: "Rail" },
        { value: "air", label: "Air" },
        { value: "ship", label: "Ship" }
      ]
    },
    {
      name: "transportDocNo",
      label: "Add Transport Doc No.",
      type: "input" as const
    }
  ];

  const transportDocFields = [
    {
      name: "transportDocDate",
      label: "Add Transport Doc Date",
      type: "date" as const
    },
    {
      name: "vehicleType",
      label: "Vehicle Type",
      type: "select" as const,
      options: [
        { value: "regular", label: "Regular" },
        { value: "over-dimensional-cargo", label: "Over Dimensional Cargo" }
      ]
    }
  ];

  const vehicleFields = [
    {
      name: "vehicleNumber",
      label: "Vehicle Number",
      type: "input" as const
    },
    {
      name: "transactionType",
      label: "Add Transaction Type",
      type: "select" as const,
      options: [
        { value: "regular", label: "Regular" },
        { value: "bill-to-ship-to", label: "Bill to - Ship to" },
        { value: "deemed-export", label: "Deemed Export" },
        { value: "sez-supplies", label: "SEZ Supplies" }
      ]
    }
  ];

  const supplyTypeFields = [
    {
      name: "supplyType",
      label: "Sub Supply Type",
      type: "select" as const,
      options: [
        { value: "supply", label: "Supply" },
        { value: "import", label: "Import" },
        { value: "export", label: "Export" },
        { value: "job-work", label: "Job Work" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Transporter Details</h3>

      <TransportFormSection 
        form={form}
        title=""
        fields={transporterFields}
      />

      <TransportFormSection 
        form={form}
        title=""
        fields={transportModeFields}
      />

      <TransportFormSection 
        form={form}
        title=""
        fields={transportDocFields}
      />

      <TransportFormSection 
        form={form}
        title=""
        fields={vehicleFields}
      />

      <TransportFormSection 
        form={form}
        title=""
        fields={supplyTypeFields}
      />
    </div>
  );
};

export default TransportDetailsForm;
