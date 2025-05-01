
import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import AddClientModal from "@/components/clients/AddClientModal";
import { Client } from "@/hooks/useClients";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BillingDetailsFormProps {
  form: any;
  clients?: Client[];
  handleClientChange: (clientId: string) => void;
}

export const BillingDetailsForm = ({ 
  form, 
  clients = [], 
  handleClientChange 
}: BillingDetailsFormProps) => {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(true);
  const [showClientForm, setShowClientForm] = useState(true);
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billed By Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium font-playfair">
            Billed By (Your Details)
          </h3>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter business name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter business address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter business phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field} 
                      placeholder="Enter business email" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Billed To Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium font-playfair">
            Billed To (Client's Details)
          </h3>

          <FormItem>
            <FormLabel>Select Client</FormLabel>
            <div className="flex gap-2">
              <Select
                onValueChange={handleClientChange}
                value={form.getValues("clientId")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id || ""}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => setIsAddClientOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </FormItem>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter client name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="clientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter client address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="clientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field} 
                      placeholder="Enter client email" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="clientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter client phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <AddClientModal 
        open={isAddClientOpen} 
        onOpenChange={setIsAddClientOpen} 
      />
    </div>
  );
};
