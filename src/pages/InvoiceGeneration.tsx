
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { IndianRupee, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import InvoiceSteps from "@/components/invoices/InvoiceSteps";

const steps = [
  {
    id: "details",
    name: "Add Invoice Details",
    description: "Client info and invoice details",
  },
  {
    id: "banking",
    name: "Add Banking Details",
    description: "Payment information",
  },
  {
    id: "preview",
    name: "Design & Share",
    description: "Preview and send",
  },
];

// Mock clients data
const mockClients = [
  { id: "client1", name: "Tech Solutions Inc." },
  { id: "client2", name: "Global Traders Ltd." },
  { id: "client3", name: "Innovate Systems" },
  { id: "client4", name: "Reliable Services" },
  { id: "client5", name: "Premier Corp." },
];

// Mock services data
const mockServices = [
  { id: "serv1", name: "Website Design", price: 15000 },
  { id: "serv2", name: "Logo Design", price: 5000 },
  { id: "serv3", name: "Web Development", price: 30000 },
  { id: "serv4", name: "Digital Marketing", price: 8000 },
  { id: "serv5", name: "SEO Optimization", price: 6000 },
];

const InvoiceGeneration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, rate: 0, amount: 0, serviceId: "" },
  ]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 1000)
      ).padStart(3, "0")}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 14)
      ).toISOString().split("T")[0],
      clientId: "",
      clientName: "",
      clientAddress: "",
      clientEmail: "",
      clientPhone: "",
      notes: "",
      terms: "Payment is due within 14 days of issue.",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
    },
  });

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.amount, 0);
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate amount if quantity or rate changes
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }

          // If service is selected, update rate
          if (field === "serviceId") {
            const service = mockServices.find((s) => s.id === value);
            if (service) {
              updatedItem.description = service.name;
              updatedItem.rate = service.price;
              updatedItem.amount = updatedItem.quantity * service.price;
            }
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleAddItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([
      ...items,
      { id: newId, description: "", quantity: 1, rate: 0, amount: 0, serviceId: "" },
    ]);
  };

  const handleRemoveItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleClientChange = (clientId: string) => {
    const selectedClient = mockClients.find((c) => c.id === clientId);
    if (selectedClient) {
      form.setValue("clientId", clientId);
      form.setValue("clientName", selectedClient.name);
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = form.handleSubmit((data) => {
    // In a real application, this would send data to an API
    toast({
      title: "Invoice created",
      description: "Your invoice has been created successfully.",
    });
    
    navigate("/invoices");
  });

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Invoice Details
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Invoice Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="invoiceDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Client Information</h3>

                <FormItem>
                  <FormLabel>Select Client</FormLabel>
                  <Select
                    onValueChange={handleClientChange}
                    value={form.getValues("clientId")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>

                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="clientAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Invoice Items</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2 font-medium">Item</th>
                      <th className="text-left py-2 px-2 font-medium">Description</th>
                      <th className="text-right py-2 px-2 font-medium">Qty</th>
                      <th className="text-right py-2 px-2 font-medium">Rate (₹)</th>
                      <th className="text-right py-2 px-2 font-medium">Amount (₹)</th>
                      <th className="py-2 px-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 px-2">
                          <Select
                            value={item.serviceId}
                            onValueChange={(value) =>
                              handleItemChange(item.id, "serviceId", value)
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockServices.map((service) => (
                                <SelectItem key={service.id} value={service.id}>
                                  {service.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(item.id, "description", e.target.value)
                            }
                            className="w-full"
                            placeholder="Description"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "quantity",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-20 text-right"
                            min={1}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center justify-end">
                            <IndianRupee className="h-3 w-3 mr-1" />
                            <Input
                              type="number"
                              value={item.rate}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "rate",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-28 text-right"
                              min={0}
                              step={0.01}
                            />
                          </div>
                        </td>
                        <td className="py-2 px-2 text-right">
                          <div className="flex items-center justify-end">
                            <IndianRupee className="h-3 w-3 mr-1" />
                            {item.amount.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={items.length === 1}
                          >
                            <Trash className="h-4 w-4 text-gray-400 hover:text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="text-right py-4 font-medium">
                        Total:
                      </td>
                      <td className="text-right py-4 font-medium flex justify-end items-center">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {calculateTotal().toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        );
      case 1: // Banking Details
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Banking Information</h3>
                
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter bank name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter account number" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ifscCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFSC Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter IFSC code" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI ID (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter UPI ID" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Information</h3>
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (visible to client)</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5} 
                          {...field} 
                          placeholder="Enter any notes for the client"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Terms and Conditions</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5} 
                          {...field} 
                          placeholder="Enter terms and conditions"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        );
      case 2: // Preview and Send
        return (
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="text-gray-500">{form.getValues("invoiceNumber")}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Alakh Corporation</p>
                  <p>Mirzapur, UP, India - 231312</p>
                  <p>+91 9580813770</p>
                  <p>alakh1304@gmail.com</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-gray-500 mb-1">Billed To:</p>
                  <p className="font-bold">{form.getValues("clientName")}</p>
                  <p>{form.getValues("clientAddress")}</p>
                  <p>{form.getValues("clientEmail")}</p>
                  <p>{form.getValues("clientPhone")}</p>
                </div>
                <div className="text-right">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <p className="text-gray-500">Invoice Date:</p>
                      <p>{form.getValues("invoiceDate")}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500">Due Date:</p>
                      <p>{form.getValues("dueDate")}</p>
                    </div>
                    <div className="flex justify-between font-bold">
                      <p>Total Due:</p>
                      <p className="flex items-center">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {calculateTotal().toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Item</th>
                    <th className="text-right py-2">Qty</th>
                    <th className="text-right py-2">Rate</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">
                        <p className="font-medium">{item.description || "Item"}</p>
                      </td>
                      <td className="text-right py-2">{item.quantity}</td>
                      <td className="text-right py-2 flex justify-end items-center">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {item.rate.toLocaleString("en-IN")}
                      </td>
                      <td className="text-right py-2 flex justify-end items-center">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {item.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-right py-4 font-bold">Total:</td>
                    <td className="text-right py-4 font-bold flex justify-end items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {calculateTotal().toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tfoot>
              </table>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-2">Payment Information</h4>
                  <p>Bank: {form.getValues("bankName")}</p>
                  <p>Account: {form.getValues("accountNumber")}</p>
                  <p>IFSC: {form.getValues("ifscCode")}</p>
                  {form.getValues("upiId") && <p>UPI: {form.getValues("upiId")}</p>}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p>{form.getValues("notes")}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t">
                <h4 className="font-medium mb-2">Terms & Conditions</h4>
                <p>{form.getValues("terms")}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Create New Invoice</h1>
            <p className="text-muted-foreground">
              Create a new invoice for your clients
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <InvoiceSteps 
              currentStep={currentStep} 
              steps={steps} 
              onChange={handleStepChange} 
            />
            
            <Form {...form}>
              <form onSubmit={handleSubmit}>
                {renderStepContent()}
                
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  
                  <div className="space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/invoices")}
                    >
                      Cancel
                    </Button>
                    
                    {currentStep < steps.length - 1 ? (
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit">
                        Save Invoice
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InvoiceGeneration;
