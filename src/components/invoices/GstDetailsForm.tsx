
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import GstDetailsPreview from "./GstDetailsPreview";

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

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configure GST Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="taxType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Tax Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gst">GST</SelectItem>
                      <SelectItem value="igst">IGST</SelectItem>
                      <SelectItem value="cgst">CGST + SGST</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeOfSupply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Supply</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select place of supply" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="01-jammu">
                        01-Jammu & Kashmir
                      </SelectItem>
                      <SelectItem value="02-himachal">
                        02-Himachal Pradesh
                      </SelectItem>
                      <SelectItem value="03-punjab">03-Punjab</SelectItem>
                      <SelectItem value="04-chandigarh">
                        04-Chandigarh
                      </SelectItem>
                      <SelectItem value="05-uttarakhand">
                        05-Uttarakhand
                      </SelectItem>
                      <SelectItem value="06-haryana">06-Haryana</SelectItem>
                      <SelectItem value="07-delhi">07-Delhi</SelectItem>
                      <SelectItem value="08-rajasthan">08-Rajasthan</SelectItem>
                      <SelectItem value="09-up">09-Uttar Pradesh</SelectItem>
                      <SelectItem value="10-bihar">10-Bihar</SelectItem>
                      <SelectItem value="11-sikkim">11-Sikkim</SelectItem>
                      <SelectItem value="12-arunachal">
                        12-Arunachal Pradesh
                      </SelectItem>
                      <SelectItem value="13-nagaland">13-Nagaland</SelectItem>
                      <SelectItem value="14-manipur">14-Manipur</SelectItem>
                      <SelectItem value="15-mizoram">15-Mizoram</SelectItem>
                      <SelectItem value="16-tripura">16-Tripura</SelectItem>
                      <SelectItem value="17-meghalaya">17-Meghalaya</SelectItem>
                      <SelectItem value="18-assam">18-Assam</SelectItem>
                      <SelectItem value="19-west-bengal">
                        19-West Bengal
                      </SelectItem>
                      <SelectItem value="20-jharkhand">20-Jharkhand</SelectItem>
                      <SelectItem value="21-odisha">21-Odisha</SelectItem>
                      <SelectItem value="22-chattisgarh">
                        22-Chattisgarh
                      </SelectItem>
                      <SelectItem value="23-mp">
                        23-Madhya Pradesh
                      </SelectItem>
                      <SelectItem value="24-gujarat">24-Gujarat</SelectItem>
                      <SelectItem value="27-maharashtra">
                        27-Maharashtra
                      </SelectItem>
                      <SelectItem value="29-karnataka">29-Karnataka</SelectItem>
                      <SelectItem value="30-goa">30-Goa</SelectItem>
                      <SelectItem value="32-kerala">32-Kerala</SelectItem>
                      <SelectItem value="33-tn">33-Tamil Nadu</SelectItem>
                      <SelectItem value="37-andhra">
                        37-Andhra Pradesh
                      </SelectItem>
                      <SelectItem value="36-telangana">36-Telangana</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gstType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select GST type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unregistered">Unregistered</SelectItem>
                      <SelectItem value="registered">Registered</SelectItem>
                      <SelectItem value="composition">Composition</SelectItem>
                      <SelectItem value="overseas">Overseas</SelectItem>
                      <SelectItem value="sez">SEZ</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gstNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter GST number"
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gstReverseCharge"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is Reverse Charge Applicable?</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nonGstClient"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      You are billing to a Non-GST Registered client
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
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
