
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
import { Button } from "@/components/ui/button";

interface TransportDetailsFormProps {
  form: any;
}

const TransportDetailsForm: React.FC<TransportDetailsFormProps> = ({ form }) => {
  const handleCalculateDistance = () => {
    // This would integrate with a maps API to calculate distance
    console.log("Calculate distance");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Transporter Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="transporterName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Transporter</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transporter" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bluedart">BlueDart</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="dtdc">DTDC</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
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
                  <Input {...field} type="number" min="0" />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCalculateDistance}
                  className="whitespace-nowrap"
                >
                  Calculate
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
              <FormLabel>Add Mode of Transport</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="road">Road</SelectItem>
                  <SelectItem value="rail">Rail</SelectItem>
                  <SelectItem value="air">Air</SelectItem>
                  <SelectItem value="ship">Ship</SelectItem>
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
              <FormLabel>Add Transport Doc No.</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Add Transport Doc Date</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="over-dimensional-cargo">Over Dimensional Cargo</SelectItem>
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
                <Input {...field} />
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
              <FormLabel>Add Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="bill-to-ship-to">Bill to - Ship to</SelectItem>
                  <SelectItem value="deemed-export">Deemed Export</SelectItem>
                  <SelectItem value="sez-supplies">SEZ Supplies</SelectItem>
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
          name="supplyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Supply Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supply type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="supply">Supply</SelectItem>
                  <SelectItem value="import">Import</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                  <SelectItem value="job-work">Job Work</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default TransportDetailsForm;
