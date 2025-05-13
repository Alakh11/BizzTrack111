
import React, { useState, useEffect } from "react";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, UserSearch } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CustomerFormProps {
  onSelectCustomer: (customer: { name: string; mobile: string }) => void;
}

interface CustomerFormValues {
  name: string;
  mobile: string;
}

interface Customer {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  address?: string;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [openPopover, setOpenPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  
  const form = useForm<CustomerFormValues>({
    defaultValues: {
      name: "",
      mobile: "",
    },
  });
  
  // Fetch customers data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('name', { ascending: true });
          
        if (error) throw error;
        setCustomers(data || []);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    
    fetchCustomers();
  }, []);
  
  const handleFormSubmit = (values: CustomerFormValues) => {
    onSelectCustomer(values);
  };
  
  const handleSelectCustomer = (customer: Customer) => {
    form.setValue("name", customer.name);
    form.setValue("mobile", customer.mobile);
    onSelectCustomer({ name: customer.name, mobile: customer.mobile });
    setOpenPopover(false);
  };
  
  const handleAddCustomer = async () => {
    const name = form.getValues("name");
    const mobile = form.getValues("mobile");
    
    if (!name || !mobile) return;
    
    setLoading(true);
    
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No active session found");
      }
      
      const { data, error } = await supabase
        .from('customers')
        .insert({
          name, 
          mobile,
          user_id: session.user.id
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setCustomers([...customers, data]);
      setLoading(false);
    } catch (error) {
      console.error('Error adding customer:', error);
      setLoading(false);
    }
  };
  
  const filteredCustomers = searchQuery 
    ? customers.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.mobile.includes(searchQuery)
      )
    : customers;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="flex justify-between items-center">
              <FormLabel>Customer</FormLabel>
              
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="h-8 px-2"
                  >
                    <UserSearch className="h-4 w-4 mr-1" />
                    Find Customer
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-0" align="end">
                  <Command>
                    <CommandInput 
                      placeholder="Search customers..." 
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      <CommandGroup>
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((customer) => (
                            <CommandItem 
                              key={customer.id} 
                              onSelect={() => handleSelectCustomer(customer)}
                              className="cursor-pointer"
                            >
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-xs text-muted-foreground">{customer.mobile}</p>
                              </div>
                            </CommandItem>
                          ))
                        ) : (
                          <CommandItem disabled>No customers found</CommandItem>
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Customer name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Phone number" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleAddCustomer}
              disabled={loading}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-1" />
              Save as New Customer
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
