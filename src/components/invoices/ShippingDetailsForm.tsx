
import React, { useState } from "react";
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

  const handleSaveToClientDetails = (checked: boolean) => {
    // This would update the client record with the shipping details
    console.log("Save to client details:", checked);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipped From */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Shipped From</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="useBusinessAddress" 
              checked={useBusinessAddress}
              onCheckedChange={handleUseBusinessAddress}
            />
            <label htmlFor="useBusinessAddress" className="text-sm">Same as your business address</label>
          </div>
          
          <FormField
            control={form.control}
            name="shippedFromWarehouse"
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
          
          <FormField
            control={form.control}
            name="shippedFromName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business / Freelancer Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={useBusinessAddress} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            name="shippedFromAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address (optional)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={useBusinessAddress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {showExtraFromFields && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="shippedFromCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => setShowExtraFromFields(!showExtraFromFields)}
          >
            <Plus className="h-4 w-4 mr-1" /> 
            {showExtraFromFields ? "Show Less Fields" : "Add More Fields"}
          </Button>
        </div>
        
        {/* Shipped To */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Shipped To</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="useClientAddress" 
              checked={useClientAddress}
              onCheckedChange={handleUseClientAddress}
              disabled={!clientName || !clientAddress}
            />
            <label htmlFor="useClientAddress" className="text-sm">Same as client's address</label>
          </div>
          
          <FormField
            control={form.control}
            name="shippedToName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client's business name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={useClientAddress} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            name="shippedToAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address (optional)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={useClientAddress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {showExtraToFields && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="shippedToCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox 
                  id="saveToClient" 
                  onCheckedChange={handleSaveToClientDetails}
                />
                <label htmlFor="saveToClient" className="text-sm">Save to client details</label>
              </div>
            </>
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => setShowExtraToFields(!showExtraToFields)}
          >
            <Plus className="h-4 w-4 mr-1" /> 
            {showExtraToFields ? "Show Less Fields" : "Add More Fields"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetailsForm;
