
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  taxType: z.string().min(1, "Please select a tax type"),
  placeOfSupply: z.string().min(1, "Please select a place of supply"),
  gstType: z.string().min(1, "Please select a GST type"),
  isReverseChargeApplicable: z.boolean().default(false),
  isNonGstRegisteredClient: z.boolean().default(false),
});

interface GstDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
}

const taxTypes = [
  { id: "gst", name: "GST" },
  { id: "cgst_sgst", name: "CGST & SGST" },
  { id: "igst", name: "IGST" },
];

const indianStates = [
  { id: "AN", name: "Andaman and Nicobar Islands" },
  { id: "AP", name: "Andhra Pradesh" },
  { id: "AR", name: "Arunachal Pradesh" },
  { id: "AS", name: "Assam" },
  { id: "BR", name: "Bihar" },
  { id: "CH", name: "Chandigarh" },
  { id: "CT", name: "Chhattisgarh" },
  { id: "DN", name: "Dadra and Nagar Haveli" },
  { id: "DD", name: "Daman and Diu" },
  { id: "DL", name: "Delhi" },
  { id: "GA", name: "Goa" },
  { id: "GJ", name: "Gujarat" },
  { id: "HR", name: "Haryana" },
  { id: "HP", name: "Himachal Pradesh" },
  { id: "JK", name: "Jammu and Kashmir" },
  { id: "JH", name: "Jharkhand" },
  { id: "KA", name: "Karnataka" },
  { id: "KL", name: "Kerala" },
  { id: "LA", name: "Ladakh" },
  { id: "LD", name: "Lakshadweep" },
  { id: "MP", name: "Madhya Pradesh" },
  { id: "MH", name: "Maharashtra" },
  { id: "MN", name: "Manipur" },
  { id: "ML", name: "Meghalaya" },
  { id: "MZ", name: "Mizoram" },
  { id: "NL", name: "Nagaland" },
  { id: "OR", name: "Odisha" },
  { id: "PY", name: "Puducherry" },
  { id: "PB", name: "Punjab" },
  { id: "RJ", name: "Rajasthan" },
  { id: "SK", name: "Sikkim" },
  { id: "TN", name: "Tamil Nadu" },
  { id: "TG", name: "Telangana" },
  { id: "TR", name: "Tripura" },
  { id: "UP", name: "Uttar Pradesh" },
  { id: "UT", name: "Uttarakhand" },
  { id: "WB", name: "West Bengal" },
];

const gstTypes = [
  { id: "registered", name: "Registered Business" },
  { id: "unregistered", name: "Unregistered Business" },
  { id: "consumer", name: "Consumer" },
  { id: "overseas", name: "Overseas" },
];

const GstDetails = ({ open, onOpenChange, onSave }: GstDetailsProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taxType: "",
      placeOfSupply: "",
      gstType: "",
      isReverseChargeApplicable: false,
      isNonGstRegisteredClient: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure Tax</DialogTitle>
          <DialogDescription>
            Set up GST details for this invoice
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="taxType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1. Select Tax Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax type" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeOfSupply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2. Place of Supply</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map(state => (
                        <SelectItem key={state.id} value={state.id}>{state.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gstType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>3. GST Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select GST type" />
                    </SelectTrigger>
                    <SelectContent>
                      {gstTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 pt-2">
              <h4 className="font-medium text-sm">5. Other Options</h4>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm">Is Reverse Charge Applicable?</FormLabel>
                  <div className="text-xs text-muted-foreground">
                    Enable if the recipient is liable to pay the tax
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="isReverseChargeApplicable"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm">You are billing to a Non-GST Registered client</FormLabel>
                  <div className="text-xs text-muted-foreground">
                    Enable for clients without GST registration
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="isNonGstRegisteredClient"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GstDetails;
