
import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const countries = [
  { id: "in", name: "India" },
  { id: "us", name: "United States" },
  { id: "uk", name: "United Kingdom" },
  { id: "ca", name: "Canada" },
  { id: "au", name: "Australia" },
];

const warehouses = [
  { id: "main", name: "Main Warehouse" },
  { id: "secondary", name: "Secondary Warehouse" },
];

interface ShippingDetailsProps {
  form: any;
}

const ShippingDetails = ({ form }: ShippingDetailsProps) => {
  const [useSameBusinessAddress, setUseSameBusinessAddress] = useState(false);
  const [useSameClientAddress, setUseSameClientAddress] = useState(false);
  const [showMoreFields, setShowMoreFields] = useState(false);

  const handleSameBusinessAddress = (checked: boolean) => {
    setUseSameBusinessAddress(checked);
    if (checked) {
      // Here you would populate the fields with business address
      form.setValue("shippedFromName", "Alakh Corporation");
      form.setValue("shippedFromCountry", "in");
      form.setValue("shippedFromAddress", "Mirzapur, UP, India - 231312");
      form.setValue("shippedFromCity", "Mirzapur");
      form.setValue("shippedFromPostalCode", "231312");
      form.setValue("shippedFromState", "UP");
    }
  };

  const handleSameClientAddress = (checked: boolean) => {
    setUseSameClientAddress(checked);
    if (checked) {
      // Populate with client address from form
      const clientName = form.getValues("clientName");
      const clientAddress = form.getValues("clientAddress");
      
      if (clientName) form.setValue("shippedToName", clientName);
      if (clientAddress) {
        form.setValue("shippedToAddress", clientAddress);
        // In a real app, you would parse the address to get city, state, etc.
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipped From Section */}
        <div className="space-y-4">
          <h4 className="font-medium">Shipped From</h4>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sameBusinessAddress"
              checked={useSameBusinessAddress}
              onCheckedChange={handleSameBusinessAddress}
            />
            <label htmlFor="sameBusinessAddress" className="text-sm">Same as your business address</label>
          </div>
          
          <FormField
            control={form.control}
            name="shippedFromWarehouse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Warehouse</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={useSameBusinessAddress}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map(warehouse => (
                      <SelectItem key={warehouse.id} value={warehouse.id}>{warehouse.name}</SelectItem>
                    ))}
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
                  <Input {...field} disabled={useSameBusinessAddress} />
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
                <Select onValueChange={field.onChange} value={field.value} disabled={useSameBusinessAddress}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
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
                  <Textarea {...field} rows={3} disabled={useSameBusinessAddress} />
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
                    <Input {...field} disabled={useSameBusinessAddress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shippedFromPostalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code / ZIP Code</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={useSameBusinessAddress} />
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
                  <Input {...field} disabled={useSameBusinessAddress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {showMoreFields && (
            <div className="space-y-4 pt-2 border-t">
              <h4 className="font-medium text-sm pt-2">Additional Fields</h4>
              {/* You can add more fields here */}
            </div>
          )}
          
          <Button 
            type="button" 
            variant="ghost" 
            className="flex items-center text-sm"
            onClick={() => setShowMoreFields(!showMoreFields)}
          >
            <Plus className="h-4 w-4 mr-1" /> Add More Fields
          </Button>
        </div>
        
        {/* Shipped To Section */}
        <div className="space-y-4">
          <h4 className="font-medium">Shipped To</h4>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sameClientAddress"
              checked={useSameClientAddress}
              onCheckedChange={handleSameClientAddress}
            />
            <label htmlFor="sameClientAddress" className="text-sm">Same as client's address</label>
          </div>
          
          <FormField
            control={form.control}
            name="shippedToName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client's Business Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={useSameClientAddress} />
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
                <Select onValueChange={field.onChange} value={field.value} disabled={useSameClientAddress}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
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
                  <Textarea {...field} rows={3} disabled={useSameClientAddress} />
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
                    <Input {...field} disabled={useSameClientAddress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shippedToPostalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code / ZIP Code</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={useSameClientAddress} />
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
                  <Input {...field} disabled={useSameClientAddress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="saveToClientDetails" />
            <label htmlFor="saveToClientDetails" className="text-sm">Save to client details</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
