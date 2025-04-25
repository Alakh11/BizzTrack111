
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronsRight, FileText, Upload } from "lucide-react";

// Define the form schema for basic validation
const invoiceFormSchema = z.object({
  // Step 1: Invoice Details
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  subtitle: z.string().optional(),
  
  // Step 2: Business and Client Details
  businessName: z.string().min(1, "Business name is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientAddress: z.string().optional(),
  
  // Payment details
  currency: z.string().default("INR"),
  
  // Line items will be handled separately for simplicity
});

// Steps for the invoice creation process
const steps = [
  { id: "step-1", name: "Invoice Details", fields: ["invoiceNumber", "invoiceDate", "dueDate"] },
  { id: "step-2", name: "Banking Details", fields: ["businessName", "businessAddress", "clientName"] },
  { id: "step-3", name: "Design & Share", fields: [] },
];

export default function MultiStepInvoiceForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [items, setItems] = useState([{ 
    id: 1, 
    name: "Product", 
    quantity: 1, 
    rate: 0, 
    amount: 0 
  }]);

  const form = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currency: "INR",
      subtitle: "",
      businessName: "",
      businessAddress: "",
      clientName: "",
      clientAddress: "",
    },
  });

  function onSubmit(data: z.infer<typeof invoiceFormSchema>) {
    console.log(data, items);
    // Handle form submission
    // You would typically send this data to your backend or process it further
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      name: "New Item",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalculate amount if quantity or rate changes
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = Number(updatedItem.quantity) * Number(updatedItem.rate);
          }
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalAmount = items.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create New Invoice</h1>
        <p className="text-muted-foreground">
          Create a professional invoice in just a few steps
        </p>
      </div>

      {/* Step Indicator */}
      <nav aria-label="Progress" className="mb-8">
        <ol role="list" className="flex items-center">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`relative ${
                index !== steps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div className="group flex items-center">
                <span className="flex flex-col items-center">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      currentStep >= index
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > index ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </span>
                  <span className="text-sm mt-2">{step.name}</span>
                </span>
                {index !== steps.length - 1 && (
                  <span
                    className={`ml-4 hidden h-0.5 w-full sm:block ${
                      currentStep > index ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Step 1: Invoice Details */}
            {currentStep === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Invoice Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Invoice Subtitle (Optional)</Label>
                    <Input 
                      placeholder="Add Subtitle"
                      {...form.register("subtitle")}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="invoiceNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Invoice No</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="mr-2">
                      Add More Fields
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Banking Details */}
            {currentStep === 1 && (
              <>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-medium">Business Logo</h3>
                        <p className="text-sm text-muted-foreground">
                          Resolution up to 1080x1080px. PNG or JPEG file.
                        </p>
                        <Button variant="outline" className="mt-2">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 mt-4">
                      <h3 className="font-medium">Billed By</h3>
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
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Enter business address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Billed To</h3>
                      <FormField
                        control={form.control}
                        name="clientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Name/Business</FormLabel>
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
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <Button variant="outline">
                        Add Shipping Details
                      </Button>
                    </div>

                    <div className="mt-4">
                      <Button variant="outline">
                        Add GST
                      </Button>
                    </div>

                    <div className="mt-4">
                      <Label>Currency</Label>
                      <div className="bg-muted p-2 rounded mt-1">
                        Indian Rupee (INR, ₹)
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Step 3: Design & Share */}
            {currentStep === 2 && (
              <>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Line Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Item</th>
                            <th className="text-left py-2">Quantity</th>
                            <th className="text-left py-2">Rate</th>
                            <th className="text-left py-2">Amount</th>
                            <th className="text-left py-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="py-2">
                                <Input
                                  value={item.name}
                                  onChange={(e) =>
                                    updateItem(item.id, "name", e.target.value)
                                  }
                                  placeholder="Name/SKU Id (Required)"
                                />
                              </td>
                              <td className="py-2">
                                <Input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateItem(item.id, "quantity", Number(e.target.value))
                                  }
                                />
                              </td>
                              <td className="py-2">
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={item.rate}
                                  onChange={(e) =>
                                    updateItem(item.id, "rate", Number(e.target.value))
                                  }
                                  placeholder="₹"
                                />
                              </td>
                              <td className="py-2">
                                ₹{item.amount.toLocaleString('en-IN')}
                              </td>
                              <td className="py-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteItem(item.id)}
                                  disabled={items.length === 1}
                                >
                                  ×
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4">
                      <Button type="button" variant="outline" onClick={addItem}>
                        Add New Line
                      </Button>
                    </div>

                    <div className="mt-6 border-t pt-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">₹{totalAmount.toLocaleString('en-IN')} (INR)</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button type="button" variant="outline" className="mr-2">
                        Show Total In Words
                      </Button>
                      <Button type="button" variant="outline">
                        Add More Fields
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Add Signature</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Signature
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Terms & Conditions</Label>
                      <Textarea
                        placeholder="Add your terms and conditions here..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea
                        placeholder="Add any additional notes here..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button type="button" variant="outline">
                    Save As Draft
                  </Button>
                  <Button type="submit">Save & Continue</Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
