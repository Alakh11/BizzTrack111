import React, { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ShippingAddressSectionProps {
  form: any;
  type: "from" | "to";
  title: string;
  addressSource?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    postal?: string;
    country?: string;
  };
  useSourceAddress: boolean;
  setUseSourceAddress: (checked: boolean) => void;
  sourceLabel: string;
  showExtra: boolean;
  setShowExtra: (show: boolean) => void;
}

const ShippingAddressSection: React.FC<ShippingAddressSectionProps> = ({
  form,
  type,
  title,
  addressSource,
  useSourceAddress,
  setUseSourceAddress,
  sourceLabel,
  showExtra,
  setShowExtra,
}) => {
  const prefix = type === "from" ? "shippedFrom" : "shippedTo";

  // Update fields when useSourceAddress changes
  useEffect(() => {
    if (useSourceAddress && addressSource) {
      // Apply source address to the form fields
      form.setValue(`${prefix}Name`, addressSource.name || "");
      form.setValue(`${prefix}Address`, addressSource.address || "");
      form.setValue(`${prefix}City`, addressSource.city || "");
      form.setValue(`${prefix}State`, addressSource.state || "");
      form.setValue(`${prefix}Postal`, addressSource.postal || "");
      form.setValue(`${prefix}Country`, addressSource.country || "india");
    }
  }, [useSourceAddress, addressSource, form, prefix]);

  const handleSaveToClientDetails = (checked: boolean) => {
    // This would update the client record with the shipping details
    console.log("Save to client details:", checked);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>

      <div className="flex items-center space-x-2">
        <Checkbox
          id={`use${type === "from" ? "Business" : "Client"}Address`}
          checked={useSourceAddress}
          onCheckedChange={setUseSourceAddress}
          disabled={
            type === "to" && (!addressSource?.name || !addressSource?.address)
          }
        />
        <label
          htmlFor={`use${type === "from" ? "Business" : "Client"}Address`}
          className="text-sm"
        >
          {sourceLabel}
        </label>
      </div>

      {type === "from" && (
        <FormField
          control={form.control}
          name={`${prefix}Warehouse`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Warehouse</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="main">Main Warehouse</SelectItem>
                  <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name={`${prefix}Name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {type === "from"
                ? "Business / Freelancer Name"
                : "Client's business name"}
            </FormLabel>
            <FormControl>
              <Input {...field} disabled={useSourceAddress} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`${prefix}Country`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Country</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || "india"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`${prefix}Address`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address (optional)</FormLabel>
            <FormControl>
              <Input {...field} disabled={useSourceAddress} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showExtra && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`${prefix}City`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={useSourceAddress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`${prefix}Postal`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code / ZIP Code</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={useSourceAddress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name={`${prefix}State`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>State (optional)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={useSourceAddress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === "to" && (
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="saveToClient"
                onCheckedChange={handleSaveToClientDetails}
              />
              <label htmlFor="saveToClient" className="text-sm">
                Save to client details
              </label>
            </div>
          )}
        </>
      )}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mt-2"
        onClick={() => setShowExtra(!showExtra)}
      >
        <Plus className="h-4 w-4 mr-1" />
        {showExtra ? "Show Less Fields" : "Add More Fields"}
      </Button>
    </div>
  );
};

export default ShippingAddressSection;
