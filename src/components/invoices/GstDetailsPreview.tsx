import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GstDetailsPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gstDetails: {
    taxType?: string;
    placeOfSupply?: string;
    gstType?: string;
    gstNumber?: string;
    reverseCharge?: boolean;
    nonGstClient?: boolean;
  };
}

const GstDetailsPreview: React.FC<GstDetailsPreviewProps> = ({
  open,
  onOpenChange,
  gstDetails,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>GST Details Preview</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-sm">Tax Type:</p>
              <p className="text-sm">{gstDetails.taxType || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Place of Supply:</p>
              <p className="text-sm">
                {gstDetails.placeOfSupply || "Not specified"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-sm">GST Type:</p>
              <p className="text-sm">{gstDetails.gstType || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium text-sm">GST Number:</p>
              <p className="text-sm">
                {gstDetails.gstNumber || "Not specified"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 border rounded flex items-center justify-center">
                {gstDetails.reverseCharge && "✓"}
              </div>
              <p className="text-sm">Is Reverse Charge Applicable</p>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 border rounded flex items-center justify-center">
                {gstDetails.nonGstClient && "✓"}
              </div>
              <p className="text-sm">Billing to a Non-GST Registered client</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GstDetailsPreview;
