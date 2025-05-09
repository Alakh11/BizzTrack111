import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GstDetailsPreview from "./GstDetailsPreview";
import GstFormSection from "../gst/GstFormSection";

interface GstDetailsFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: any;
}

const GstDetailsForm = ({ open, onOpenChange, form }: GstDetailsFormProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const gstDetails = {
    taxType: form.getValues("taxType"),
    placeOfSupply: form.getValues("placeOfSupply"),
    gstType: form.getValues("gstType"),
    gstNumber: form.getValues("gstNumber"),
    reverseCharge: form.getValues("gstReverseCharge"),
    nonGstClient: form.getValues("nonGstClient"),
  };

  const basicGstFields = [
    {
      name: "taxType",
      label: "Select Tax Type",
      type: "select" as const,
      options: [
        { value: "gst", label: "GST" },
        { value: "igst", label: "IGST" },
        { value: "cgst", label: "CGST + SGST" },
      ],
    },
    {
      name: "placeOfSupply",
      label: "Place of Supply",
      type: "select" as const,
      options: [
        { value: "01-jammu", label: "01-Jammu & Kashmir" },
        { value: "02-himachal", label: "02-Himachal Pradesh" },
        { value: "03-punjab", label: "03-Punjab" },
        { value: "04-chandigarh", label: "04-Chandigarh" },
        { value: "05-uttarakhand", label: "05-Uttarakhand" },
        { value: "06-haryana", label: "06-Haryana" },
        { value: "07-delhi", label: "07-Delhi" },
        { value: "08-rajasthan", label: "08-Rajasthan" },
        { value: "09-up", label: "09-Uttar Pradesh" },
        { value: "10-bihar", label: "10-Bihar" },
        { value: "11-sikkim", label: "11-Sikkim" },
        { value: "12-arunachal", label: "12-Arunachal Pradesh" },
        { value: "13-nagaland", label: "13-Nagaland" },
        { value: "14-manipur", label: "14-Manipur" },
        { value: "15-mizoram", label: "15-Mizoram" },
        { value: "16-tripura", label: "16-Tripura" },
        { value: "17-meghalaya", label: "17-Meghalaya" },
        { value: "18-assam", label: "18-Assam" },
        { value: "19-west-bengal", label: "19-West Bengal" },
        { value: "20-jharkhand", label: "20-Jharkhand" },
        { value: "21-odisha", label: "21-Odisha" },
        { value: "22-chattisgarh", label: "22-Chattisgarh" },
        { value: "23-mp", label: "23-Madhya Pradesh" },
        { value: "24-gujarat", label: "24-Gujarat" },
        { value: "27-maharashtra", label: "27-Maharashtra" },
        { value: "29-karnataka", label: "29-Karnataka" },
        { value: "30-goa", label: "30-Goa" },
        { value: "32-kerala", label: "32-Kerala" },
        { value: "33-tn", label: "33-Tamil Nadu" },
        { value: "37-andhra", label: "37-Andhra Pradesh" },
        { value: "36-telangana", label: "36-Telangana" },
      ].sort((a, b) => {
        // Sort by state name alphabetically
        return a.label.localeCompare(b.label);
      }),
    },
  ];

  const gstTypeFields = [
    {
      name: "gstType",
      label: "GST Type",
      type: "select" as const,
      options: [
        { value: "unregistered", label: "Unregistered" },
        { value: "registered", label: "Registered" },
        { value: "composition", label: "Composition" },
        { value: "overseas", label: "Overseas" },
        { value: "sez", label: "SEZ" },
      ],
    },
    {
      name: "gstNumber",
      label: "GST Number",
      type: "input" as const,
    },
  ];

  const checkboxFields = [
    {
      name: "gstReverseCharge",
      label: "Is Reverse Charge Applicable?",
      type: "checkbox" as const,
    },
    {
      name: "nonGstClient",
      label: "You are billing to a Non-GST Registered client",
      type: "checkbox" as const,
    },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configure GST Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <GstFormSection form={form} fields={basicGstFields} />

            <GstFormSection form={form} fields={gstTypeFields} />

            <GstFormSection form={form} fields={checkboxFields} />
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePreview} type="button">
              Preview
            </Button>
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <GstDetailsPreview
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        gstDetails={gstDetails}
      />
    </>
  );
};

export default GstDetailsForm;
