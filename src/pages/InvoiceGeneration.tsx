
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClients } from "@/hooks/useClients";
import { useServices } from "@/hooks/useServices";
import { useInvoices } from "@/hooks/useInvoices";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import InvoiceSteps from "@/components/invoices/InvoiceSteps";
import { ArrowLeft, ArrowRight, PlusCircle, Upload, Pen } from "lucide-react";

const formSchema = z.object({
  // Invoice Details
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  
  // Seller Details
  sellerName: z.string().min(1, "Seller name is required"),
  sellerAddress: z.string().min(1, "Seller address is required"),
  sellerEmail: z.string().email("Invalid email address"),
  sellerPhone: z.string().min(1, "Phone number is required"),
  
  // Customer Details
  customerName: z.string().min(1, "Customer name is required"),
  customerAddress: z.string().min(1, "Customer address is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(1, "Phone number is required"),
  
  // Product Details
  productName: z.string().min(1, "Product name is required"),
  productDescription: z.string(),
  quantity: z.string().min(1, "Quantity is required"),
  unitPrice: z.string().min(1, "Unit price is required"),
  
  // Additional Details
  notes: z.string(),
  terms: z.string(),
});

const steps = [
  { id: "step-1", name: "Add Invoice Details" },
  { id: "step-2", name: "Add Banking Details" },
  { id: "step-3", name: "Design & Share", description: "(optional)" },
];

const InvoiceGeneration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createInvoice } = useInvoices();
  const { clients } = useClients();
  const { services } = useServices();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      sellerName: "",
      sellerAddress: "",
      sellerEmail: "",
      sellerPhone: "",
      customerName: "",
      customerAddress: "",
      customerEmail: "",
      customerPhone: "",
      productName: "",
      productDescription: "",
      quantity: "",
      unitPrice: "",
      notes: "",
      terms: "Payment is due within 30 days",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const total = parseFloat(data.quantity) * parseFloat(data.unitPrice);
    
    try {
      // Create invoice
      await createInvoice.mutateAsync({
        user_id: user?.id,
        invoice_number: data.invoiceNumber,
        invoice_date: data.invoiceDate,
        due_date: data.dueDate,
        total_amount: total,
        notes: data.notes,
        terms: data.terms,
      });
      
      // Navigate to invoices list
      navigate('/invoices');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create New Invoice</h1>
          <p className="text-muted-foreground">Create a new invoice by filling in the details below</p>
        </div>

        <InvoiceSteps 
          currentStep={currentStep} 
          steps={steps} 
          onChange={(step) => setCurrentStep(step)} 
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 0 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Invoice Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="invoiceNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Invoice Number</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Business Information</CardTitle>
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-2" /> Add Logo
                    </Button>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="sellerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter your business name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sellerAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Enter your business address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="sellerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="Enter your email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sellerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter your phone number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Client Information</CardTitle>
                    <Button size="sm" variant="outline">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add New Client
                    </Button>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="customerName"
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
                      name="customerAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Enter client address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="Enter client email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter client phone number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {currentStep === 1 && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Currency Settings</CardTitle>
                      <div>
                        <span className="text-sm font-medium">Currency: </span>
                        <span className="text-sm">Indian Rupee (INR, ₹)</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Item Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left px-2 py-3">Item</th>
                            <th className="text-left px-2 py-3">Description</th>
                            <th className="text-right px-2 py-3">Quantity</th>
                            <th className="text-right px-2 py-3">Rate (₹)</th>
                            <th className="text-right px-2 py-3">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-2 py-3">
                              <FormField
                                control={form.control}
                                name="productName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input {...field} placeholder="Item name" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td className="px-2 py-3">
                              <FormField
                                control={form.control}
                                name="productDescription"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input {...field} placeholder="Description" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td className="px-2 py-3">
                              <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input {...field} type="number" min="1" placeholder="Qty" className="text-right" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td className="px-2 py-3">
                              <FormField
                                control={form.control}
                                name="unitPrice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input {...field} type="number" min="0" step="0.01" placeholder="0.00" className="text-right" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td className="px-2 py-3 text-right">
                              ₹{form.watch('quantity') && form.watch('unitPrice')
                                ? (parseFloat(form.watch('quantity')) * parseFloat(form.watch('unitPrice'))).toLocaleString('en-IN')
                                : '0.00'}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3} className="px-2 py-3">
                              <Button type="button" variant="outline" size="sm">
                                <PlusCircle className="h-4 w-4 mr-2" /> Add Item
                              </Button>
                            </td>
                            <td className="px-2 py-3 text-right font-medium">Total:</td>
                            <td className="px-2 py-3 text-right font-bold">
                              ₹{form.watch('quantity') && form.watch('unitPrice')
                                ? (parseFloat(form.watch('quantity')) * parseFloat(form.watch('unitPrice'))).toLocaleString('en-IN')
                                : '0.00'}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Enter any additional notes" />
                          </FormControl>
                          <FormMessage />
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
                            <Textarea {...field} placeholder="Enter terms and conditions" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </>
            )}

            {currentStep === 2 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Design Your Invoice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/10 rounded-lg border border-dashed border-border p-6 text-center">
                      <div className="mb-4">
                        <Pen className="h-8 w-8 mx-auto text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Customize Invoice Appearance</h3>
                      <p className="text-muted-foreground mb-4">
                        Add your brand colors, custom fields, and design elements to make your invoice unique.
                      </p>
                      <div className="flex justify-center gap-3">
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" /> Add Logo
                        </Button>
                        <Button>Customize Design</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Share Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-lg border">
                        <h3 className="font-medium mb-2">Email to Client</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Send the invoice directly to your client via email.
                        </p>
                        <Button variant="outline" className="w-full">Email Invoice</Button>
                      </div>
                      <div className="bg-white p-6 rounded-lg border">
                        <h3 className="font-medium mb-2">Download as PDF</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Save a copy of the invoice as a PDF file.
                        </p>
                        <Button variant="outline" className="w-full">Download PDF</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handlePrevStep}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              )}
              <div className="flex-1"></div>
              {currentStep < steps.length - 1 ? (
                <Button 
                  type="button" 
                  onClick={handleNextStep}
                >
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit">Generate Invoice</Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default InvoiceGeneration;
