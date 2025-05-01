
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransportDetailsFormProps {
  form: any;
}

const transporters = [
  { value: "fedex", label: "FedEx" },
  { value: "dhl", label: "DHL" },
  { value: "ups", label: "UPS" },
  { value: "usps", label: "USPS" },
  { value: "other", label: "Other" },
];

const transportModes = [
  { value: "road", label: "Road" },
  { value: "rail", label: "Rail" },
  { value: "air", label: "Air" },
  { value: "ship", label: "Ship" },
];

const vehicleTypes = [
  { value: "regular", label: "Regular" },
  { value: "over_dimensional_cargo", label: "Over Dimensional Cargo" },
];

const transactionTypes = [
  { value: "regular", label: "Regular" },
  { value: "bill_to", label: "Bill To" },
  { value: "bill_from", label: "Bill From" },
  { value: "combination", label: "Combination" },
];

const supplyTypes = [
  { value: "supply", label: "Supply" },
  { value: "export", label: "Export" },
  { value: "import", label: "Import" },
];

export const TransportDetailsForm = ({ form }: TransportDetailsFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium font-playfair">Transport Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="transporterName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Transporter</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transporter" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transporters.map((transporter) => (
                    <SelectItem key={transporter.value} value={transporter.value}>
                      {transporter.label}
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
          name="distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distance (in Km)</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input type="number" {...field} placeholder="Enter distance" />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  title="Calculate distance"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="transportMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mode of Transport</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transport mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transportModes.map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.label}
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
          name="transportDocNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transport Doc No.</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter document number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="transportDocDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transport Doc Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="vehicleNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter vehicle number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="supplyType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sub Supply Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select supply type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {supplyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
