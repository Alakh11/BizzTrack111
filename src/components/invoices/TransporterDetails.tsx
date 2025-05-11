
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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const transporters = [
  { id: "dhl", name: "DHL" },
  { id: "fedex", name: "FedEx" },
  { id: "ups", name: "UPS" },
  { id: "bluedart", name: "BlueDart" },
  { id: "dtdc", name: "DTDC" },
];

const transportModes = [
  { id: "road", name: "Road" },
  { id: "rail", name: "Rail" },
  { id: "air", name: "Air" },
  { id: "ship", name: "Ship" },
];

const vehicleTypes = [
  { id: "regular", name: "Regular" },
  { id: "over_dimensional_cargo", name: "Over Dimensional Cargo" },
];

const transactionTypes = [
  { id: "regular", name: "Regular" },
  { id: "billing", name: "Billing" },
  { id: "export", name: "Export" },
  { id: "job_work", name: "Job Work" },
  { id: "sample", name: "Sample" },
];

const subSupplyTypes = [
  { id: "1", name: "Supply" },
  { id: "2", name: "Import" },
  { id: "3", name: "Export" },
  { id: "4", name: "Job Work" },
  { id: "5", name: "For Own Use" },
  { id: "6", name: "Exhibition or Fairs" },
  { id: "7", name: "Line Sales" },
  { id: "8", name: "Others" },
];

interface TransporterDetailsProps {
  form: any;
}

const TransporterDetails = ({ form }: TransporterDetailsProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Transporter Details</h4>
      
      <FormField
        control={form.control}
        name="transporter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Transporter</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select transporter" />
              </SelectTrigger>
              <SelectContent>
                {transporters.map(transporter => (
                  <SelectItem key={transporter.id} value={transporter.id}>{transporter.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distance (in Km)</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-end">
          <Button type="button" variant="outline" className="h-10">
            Calculate distance here
          </Button>
        </div>
      </div>
      
      <FormField
        control={form.control}
        name="transportMode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mode of Transport</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select transport mode" />
              </SelectTrigger>
              <SelectContent>
                {transportModes.map(mode => (
                  <SelectItem key={mode.id} value={mode.id}>{mode.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="transportDocNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transport Doc No.</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="transportDocDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Transport Doc Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map(type => (
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
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map(type => (
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
          name="subSupplyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Supply Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sub supply type" />
                </SelectTrigger>
                <SelectContent>
                  {subSupplyTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
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

export default TransporterDetails;
