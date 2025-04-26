
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee, Plus, Trash, ArrowRight, PenSquare, LayoutTemplate, PaintBucket, Type, FileImage, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InvoiceSteps from "@/components/invoices/InvoiceSteps";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useClients } from "@/hooks/useClients";
import { useInvoices } from "@/hooks/useInvoices";
import { supabase } from "@/integrations/supabase/client";

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
    id: "design",
    name: "Design & Share",
    description: "Customize and send",
  },
];

// Invoice templates
const invoiceTemplates = [
  { id: "standard", name: "Standard", image: "https://placehold.co/200x280/e9e9e9/999?text=Standard" },
  { id: "professional", name: "Professional", image: "https://placehold.co/200x280/e9e9e9/999?text=Professional" },
  { id: "modern", name: "Modern", image: "https://placehold.co/200x280/e9e9e9/999?text=Modern" },
  { id: "classic", name: "Classic", image: "https://placehold.co/200x280/e9e9e9/999?text=Classic" },
  { id: "simple", name: "Simple", image: "https://placehold.co/200x280/e9e9e9/999?text=Simple" },
];

// Color themes
const colorThemes = [
  { id: "blue", name: "Blue", color: "#3b82f6" },
  { id: "green", name: "Green", color: "#10b981" },
  { id: "purple", name: "Purple", color: "#8b5cf6" },
  { id: "orange", name: "Orange", color: "#f97316" },
  { id: "red", name: "Red", color: "#ef4444" },
  { id: "gray", name: "Gray", color: "#6b7280" },
];

// Font options
const fontOptions = [
  { id: "inter", name: "Inter" },
  { id: "roboto", name: "Roboto" },
  { id: "poppins", name: "Poppins" },
  { id: "opensans", name: "Open Sans" },
  { id: "lato", name: "Lato" },
];

const paperSizes = [
  { id: "a4", name: "A4" },
  { id: "letter", name: "Letter" },
  { id: "legal", name: "Legal" },
  { id: "a3", name: "A3" },
];

const InvoiceGeneration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, rate: 0, amount: 0, serviceId: "" },
  ]);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedFont, setSelectedFont] = useState("inter");
  const [selectedPaperSize, setSelectedPaperSize] = useState("a4");
  const [customInvoiceTitle, setCustomInvoiceTitle] = useState("INVOICE");
  const [customSubtitle, setCustomSubtitle] = useState("");
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { clients = [], isLoading: clientsLoading } = useClients();
  const { createInvoice } = useInvoices();

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
      shippedFrom: "",
      shippedTo: "",
      transportDetails: "",
      gstDetails: "",
      notes: "",
      terms: "Payment is due within 14 days of issue.",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
      watermarkText: "",
      margins: "normal",
      textScale: "100",
    },
  });

  useEffect(() => {
    // Fetch business profile data
    const fetchBusinessProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileData) {
            // You could set business details here if needed
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchBusinessProfile();
  }, []);

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
    const selectedClient = clients.find((c) => c.id === clientId);
    if (selectedClient) {
      form.setValue("clientId", clientId);
      form.setValue("clientName", selectedClient.name);
      form.setValue("clientAddress", selectedClient.address || "");
      form.setValue("clientEmail", selectedClient.email || "");
      form.setValue("clientPhone", selectedClient.phone || "");
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

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      // Prepare invoice data
      const invoiceData = {
        invoice_number: data.invoiceNumber,
        invoice_date: data.invoiceDate,
        due_date: data.dueDate,
        total_amount: calculateTotal(),
        client_id: data.clientId || null,
        notes: data.notes,
        terms: data.terms,
        status: "pending"
      };
      
      // Create invoice in database
      const { data: newInvoice } = await createInvoice.mutateAsync(invoiceData);
      
      // If invoice was created successfully, add invoice items
      if (newInvoice && newInvoice.id) {
        // Prepare invoice items
        const invoiceItems = items.map(item => ({
          invoice_id: newInvoice.id,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.rate,
          amount: item.amount,
          service_id: item.serviceId || null
        }));
        
        // Insert invoice items
        await supabase.from('invoice_items').insert(invoiceItems);
        
        toast({
          title: "Invoice created",
          description: "Your invoice has been created successfully.",
        });
        
        navigate("/invoices");
      }
    } catch (error: any) {
      console.error("Error creating invoice:", error);
      toast({
        title: "Error creating invoice",
        description: error.message || "An error occurred while creating the invoice",
        variant: "destructive"
      });
    }
  });

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Invoice Details
        return (
          <div className="space-y-8">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="customInvoiceTitle"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Input 
                        className="text-2xl font-bold border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={customInvoiceTitle}
                        onChange={(e) => setCustomInvoiceTitle(e.target.value)}
                        placeholder="INVOICE"
                      />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <Input 
                  className="text-sm text-muted-foreground border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  placeholder="Add Subtitle (Optional)"
                />
              </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Invoice Info */}
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
                
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="flex items-center text-sm"
                  onClick={() => setShowAdditionalFields(!showAdditionalFields)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add More Fields
                </Button>
                
                {showAdditionalFields && (
                  <div className="space-y-4 pt-2 border-t">
                    <FormField
                      control={form.control}
                      name="purchaseOrderNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Purchase Order Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter PO number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="referenceNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reference Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter reference number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Billing Info */}
              <div className="space-y-8">
                {/* Billed By Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billed By (Your Details)</h3>
                  
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Alakh Corporation</p>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">Mirzapur, UP, India - 231312</p>
                        <p className="text-sm text-muted-foreground">+91 9580813770</p>
                        <p className="text-sm text-muted-foreground">alakh1304@gmail.com</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Billed To Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billed To (Client's Details)</h3>
                  
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
                        {clients && clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                  
                  <div className="flex items-center">
                    <Button type="button" variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Add New Client
                    </Button>
                  </div>
                  
                  {form.getValues("clientId") && (
                    <Card className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">{form.getValues("clientName")}</p>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">{form.getValues("clientAddress")}</p>
                          <p className="text-sm text-muted-foreground">{form.getValues("clientEmail")}</p>
                          <p className="text-sm text-muted-foreground">{form.getValues("clientPhone")}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                {/* Shipping Details Toggle */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="shipping" 
                    checked={showShippingDetails} 
                    onCheckedChange={(checked) => setShowShippingDetails(!!checked)} 
                  />
                  <label 
                    htmlFor="shipping" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Add Shipping Details
                  </label>
                </div>
                
                {/* Shipping Details Section */}
                {showShippingDetails && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="shippedFrom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shipped From</FormLabel>
                            <FormControl>
                              <Textarea rows={3} {...field} placeholder="Enter shipping address" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shippedTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shipped To</FormLabel>
                            <FormControl>
                              <Textarea rows={3} {...field} placeholder="Enter delivery address" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="transportDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transport Details</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter transport details" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gstDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Details</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter GST details" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select defaultValue="inr" {...field}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inr">Indian Rupee (INR, ₹)</SelectItem>
                        <SelectItem value="usd">US Dollar (USD, $)</SelectItem>
                        <SelectItem value="eur">Euro (EUR, €)</SelectItem>
                        <SelectItem value="gbp">British Pound (GBP, £)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
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
                          <Input
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(item.id, "description", e.target.value)
                            }
                            className="w-full"
                            placeholder="Enter item description"
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
                      <td colSpan={3} className="text-right py-4 font-medium">
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
          </div>
        );
      case 1: // Banking Details
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Bank Account Details</h3>
                  
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
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">UPI Payment Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="upiId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UPI ID</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter UPI ID" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch id="qrcode" />
                    <label htmlFor="qrcode" className="text-sm">Show QR code on invoice</label>
                  </div>
                </div>
              </div>
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
        );
      case 2: // Design and Share
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Design Options */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <LayoutTemplate className="h-5 w-5 mr-2" /> Template Design
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {invoiceTemplates.map((template) => (
                      <div 
                        key={template.id}
                        className={`border rounded-md cursor-pointer overflow-hidden ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="aspect-[3/4]">
                          <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-2 text-center text-sm font-medium">{template.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <PaintBucket className="h-5 w-5 mr-2" /> Color Theme
                  </h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {colorThemes.map((theme) => (
                      <div 
                        key={theme.id}
                        className={`w-8 h-8 rounded-full cursor-pointer ${selectedColor === theme.id ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                        style={{ backgroundColor: theme.color }}
                        onClick={() => setSelectedColor(theme.id)}
                        title={theme.name}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Type className="h-5 w-5 mr-2" /> Font Style
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {fontOptions.map((font) => (
                      <div 
                        key={font.id}
                        className={`px-3 py-2 border rounded-md cursor-pointer ${selectedFont === font.id ? 'bg-primary/10 border-primary' : ''}`}
                        onClick={() => setSelectedFont(font.id)}
                      >
                        <span className="text-sm">{font.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <FileImage className="h-5 w-5 mr-2" /> Letterhead & Branding
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="letterhead" />
                      <label htmlFor="letterhead" className="text-sm">Add letterhead</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="footer" />
                      <label htmlFor="footer" className="text-sm">Add custom footer</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="watermark" />
                      <label htmlFor="watermark" className="text-sm">Add watermark</label>
                    </div>

                    <FormField
                      control={form.control}
                      name="watermarkText"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Watermark text" className="mt-2" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              {/* Page Setup */}
              <div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <FileText className="h-5 w-5 mr-2" /> Page Setup
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="paperSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paper Size</FormLabel>
                        <Select value={selectedPaperSize} onValueChange={setSelectedPaperSize}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select paper size" />
                          </SelectTrigger>
                          <SelectContent>
                            {paperSizes.map((size) => (
                              <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="margins"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Margins</FormLabel>
                        <Select defaultValue="normal" {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select margins" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="narrow">Narrow</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="wide">Wide</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="textScale"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Text Scale (%)</FormLabel>
                        <Select defaultValue="100" {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select text scale" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="90">90%</SelectItem>
                            <SelectItem value="95">95%</SelectItem>
                            <SelectItem value="100">100%</SelectItem>
                            <SelectItem value="105">105%</SelectItem>
                            <SelectItem value="110">110%</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="pageless" />
                    <label htmlFor="pageless" className="text-sm">Generate pageless PDF</label>
                  </div>
                </div>
                
                {/* Preview */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  
                  <div className="border rounded-md bg-gray-50 p-4 flex items-center justify-center">
                    <div className="bg-white border shadow-sm w-full max-w-sm aspect-[3/4] p-4">
                      <div className="text-center mb-8">
                        <h2 className="text-xl font-bold">{customInvoiceTitle}</h2>
                        {customSubtitle && <p className="text-sm text-muted-foreground">{customSubtitle}</p>}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <p>Invoice #: {form.getValues("invoiceNumber")}</p>
                        <p>Date: {form.getValues("invoiceDate")}</p>
                        <p>Due: {form.getValues("dueDate")}</p>
                      </div>
                      
                      <div className="my-4 text-xs">
                        <div className="font-medium">From: Alakh Corporation</div>
                        <div>Mirzapur, UP, India - 231312</div>
                      </div>
                      
                      <div className="my-4 text-xs">
                        <div className="font-medium">To: {form.getValues("clientName") || "Client Name"}</div>
                        <div>{form.getValues("clientAddress") || "Client Address"}</div>
                      </div>
                      
                      <table className="w-full text-xs border-t border-b my-4">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-1">Item</th>
                            <th className="text-right py-1">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-1">Sample Item</td>
                            <td className="text-right py-1">₹ 1,000.00</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="border-t">
                            <th className="text-left py-1">Total</th>
                            <th className="text-right py-1">₹ 1,000.00</th>
                          </tr>
                        </tfoot>
                      </table>
                      
                      <div className="text-xs mt-8 text-center text-muted-foreground">
                        <p>Thank you for your business!</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                        Next <ArrowRight className="ml-2 h-4 w-4" />
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
