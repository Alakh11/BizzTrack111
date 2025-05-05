
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const INDIA_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
].sort(); // Sort alphabetically

const GstFormSection = ({ form }: { form: any }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">GST Details</h3>

      <FormField
        control={form.control}
        name="taxType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tax Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || "gst"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select tax type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="gst">GST (India)</SelectItem>
                <SelectItem value="vat">VAT</SelectItem>
                <SelectItem value="tax">General Tax</SelectItem>
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
            <FormLabel>GST Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select GST type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="cgst_sgst">CGST + SGST (Same State)</SelectItem>
                <SelectItem value="igst">IGST (Different State)</SelectItem>
                <SelectItem value="export">Export</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
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
              <Input {...field} placeholder="e.g. 22AAAAA0000A1Z5" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="placeOfSupply"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Place of Supply</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {INDIA_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center space-x-4">
        <FormField
          control={form.control}
          name="gstReverseCharge"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="reverse-charge"
                />
              </FormControl>
              <FormLabel htmlFor="reverse-charge" className="cursor-pointer">
                Reverse Charge Applicable
              </FormLabel>
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-center space-x-4">
        <FormField
          control={form.control}
          name="nonGstClient"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="non-gst-client"
                />
              </FormControl>
              <FormLabel htmlFor="non-gst-client" className="cursor-pointer">
                Non-GST Registered Client
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default GstFormSection;
