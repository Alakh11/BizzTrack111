
import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShippingDetailsFormProps {
  form: any;
  clientName?: string;
  clientAddress?: string;
}

const countries = [
  { value: "india", label: "India" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
];

const warehouses = [
  { value: "main", label: "Main Warehouse" },
  { value: "secondary", label: "Secondary Warehouse" },
  { value: "branch", label: "Branch Office" },
];

export const ShippingDetailsForm = ({
  form,
  clientName,
  clientAddress,
}: ShippingDetailsFormProps) => {
  const [useBusinessAddress, setUseBusinessAddress] = useState(false);
  const [useClientAddress, setUseClientAddress] = useState(false);
  const [showFromMoreFields, setShowFromMoreFields] = useState(false);
  const [showToMoreFields, setShowToMoreFields] = useState(false);
  const [saveToClientDetails, setSaveToClientDetails] = useState(false);

  const handleUseBusinessAddress = (checked: boolean) => {
    setUseBusinessAddress(checked);
    if (checked) {
      form.setValue("shippedFromName", "Your Business Name");
      form.setValue("shippedFromAddress", "Your Business Address");
      form.setValue("shippedFromCity", "Your Business City");
      form.setValue("shippedFromState", "Your Business State");
      form.setValue("shippedFromPostal", "Your Business Postal");
      form.setValue("shippedFromCountry", "india");
    }
  };

  const handleUseClientAddress = (checked: boolean) => {
    setUseClientAddress(checked);
    if (checked && clientName && clientAddress) {
      form.setValue("shippedToName", clientName);
      form.setValue("shippedToAddress", clientAddress);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipped From Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium font-playfair">Shipped From</h3>
          
          <FormField
            control={form.control}
            name="shippedFromWarehouse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Warehouse</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.value} value={warehouse.value}>
                        {warehouse.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="use-business-address" 
              checked={useBusinessAddress}
              onCheckedChange={handleUseBusinessAddress}
            />
            <label
              htmlFor="use-business-address"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Same as your business address
            </label>
          </div>

          <FormField
            control={form.control}
            name="shippedFromName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business / Freelancer Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter business name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippedFromCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippedFromAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address (optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="shippedFromCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter city" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippedFromPostal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code / ZIP Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter postal code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="shippedFromState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State (optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter state" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showFromMoreFields && (
            <div className="space-y-4 pt-2 border-t">
              <FormField
                control={form.control}
                name="shippedFromAdditional"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter additional information" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowFromMoreFields(!showFromMoreFields)}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add More Fields
          </Button>
        </div>

        {/* Shipped To Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium font-playfair">Shipped To</h3>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="use-client-address" 
              checked={useClientAddress}
              onCheckedChange={handleUseClientAddress}
              disabled={!clientAddress}
            />
            <label
              htmlFor="use-client-address"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Same as client's address
            </label>
          </div>

          <FormField
            control={form.control}
            name="shippedToName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client's business name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter client's business name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippedToCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippedToAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address (optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="shippedToCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter city" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippedToPostal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code / ZIP Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter postal code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="shippedToState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State (optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter state" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="save-to-client" 
              checked={saveToClientDetails}
              onCheckedChange={(checked) => setSaveToClientDetails(!!checked)}
            />
            <label
              htmlFor="save-to-client"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Save to client details
            </label>
          </div>

          {showToMoreFields && (
            <div className="space-y-4 pt-2 border-t">
              <FormField
                control={form.control}
                name="shippedToAdditional"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter additional information" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowToMoreFields(!showToMoreFields)}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add More Fields
          </Button>
        </div>
      </div>
    </div>
  );
};
