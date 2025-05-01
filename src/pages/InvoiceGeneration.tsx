
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  IndianRupee,
  Plus,
  Trash,
  ArrowRight,
  FileText,
  Truck,
  FileCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InvoiceSteps from "@/components/invoices/InvoiceSteps";
import { Checkbox } from "@/components/ui/checkbox";
import { useClients } from "@/hooks/useClients";
import { useInvoices } from "@/hooks/useInvoices";
import { supabase } from "@/integrations/supabase/client";
import { BillingDetailsForm } from "@/components/invoices/BillingDetailsForm";
import { ShippingDetailsForm } from "@/components/invoices/ShippingDetailsForm";
import { TransportDetailsForm } from "@/components/invoices/TransportDetailsForm";
import { GstDetailsForm } from "@/components/invoices/GstDetailsForm";
import { PaymentOptionsForm } from "@/components/invoices/PaymentOptionsForm";

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

const InvoiceGeneration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, rate: 0, amount: 0, serviceId: "" },
  ]);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [showTransportDetails, setShowTransportDetails] = useState(false);
  const [isGstDialogOpen, setIsGstDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedFont, setSelectedFont] = useState("inter");
  const [selectedPaperSize, setSelectedPaperSize] = useState("a4");
  const [customInvoiceTitle, setCustomInvoiceTitle] = useState("INVOICE");
  const [customSubtitle, setCustomSubtitle] = useState("");
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("inr");
  const [businessLogo, setBusinessLogo] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);

  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { clients = [], isLoading: clientsLoading } = useClients();
  const { createInvoice, updateInvoice, getInvoice } = useInvoices();

  const form = useForm({
    defaultValues: {
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 1000),
      ).padStart(3, "0")}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14))
        .toISOString()
        .split("T")[0],
      clientId: "",
      clientName: "",
      clientAddress: "",
      clientEmail: "",
      clientPhone: "",
      
      // Business details
      businessName: "Alakh Corporation",
      businessAddress: "Mirzapur, UP, India - 231312",
      businessPhone: "+91 9580813770",
      businessEmail: "alakh1304@gmail.com",
      
      // Shipping details
      shippedFromName: "",
      shippedFromAddress: "",
      shippedFromCity: "",
      shippedFromState: "",
      shippedFromPostal: "",
      shippedFromCountry: "india",
      shippedFromWarehouse: "",
      
      shippedToName: "",
      shippedToAddress: "",
      shippedToCity: "",
      shippedToState: "",
      shippedToPostal: "",
      shippedToCountry: "india",
      
      // Transport details
      transporterName: "",
      distance: "",
      transportMode: "",
      transportDocNo: "",
      transportDocDate: "",
      vehicleType: "",
      vehicleNumber: "",
      transactionType: "",
      supplyType: "",
      
      // GST details
      taxType: "gst",
      placeOfSupply: "",
      gstType: "",
      gstNumber: "",
      gstReverseCharge: false,
      nonGstClient: false,
      
      // Payment details - Bank
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      branchName: "",
      
      // Payment details - UPI
      upiId: "",
      upiName: "",
      
      notes: "",
      terms: "Payment is due within 14 days of issue.",
      
      // Design details
      watermarkText: "",
      margins: "normal",
      textScale: "100",
    },
  });

  // Check if we're in edit mode
  useEffect(() => {
    const fetchInvoice = async () => {
      if (params.id) {
        try {
          setIsEditMode(true);
          setInvoiceId(params.id);

          // Try to get invoice from location state first (for better UX)
          let invoiceData;
          if (location.state?.invoice) {
            invoiceData = location.state.invoice;
          } else {
            // Fetch from API if not in state
            invoiceData = await getInvoice(params.id);
          }

          if (invoiceData) {
            // Set form values
            form.setValue("invoiceNumber", invoiceData.invoice_number);
            form.setValue("invoiceDate", invoiceData.invoice_date);
            form.setValue("dueDate", invoiceData.due_date);
            form.setValue("clientId", invoiceData.client_id || "");
            form.setValue("notes", invoiceData.notes || "");
            form.setValue("terms", invoiceData.terms || "");

            // Set client details if available
            if (invoiceData.client) {
              form.setValue("clientName", invoiceData.client.name || "");
              form.setValue("clientAddress", invoiceData.client.address || "");
              form.setValue("clientEmail", invoiceData.client.email || "");
              form.setValue("clientPhone", invoiceData.client.phone || "");
            }

            // Set invoice items
            if (
              invoiceData.invoice_items &&
              invoiceData.invoice_items.length > 0
            ) {
              setItems(
                invoiceData.invoice_items.map((item: any, index: number) => ({
                  id: index + 1,
                  description: item.description,
                  quantity: item.quantity,
                  rate: item.unit_price,
                  amount: item.amount,
                  serviceId: item.service_id || "",
                })),
              );
            }

            // If there are design settings stored in metadata
            if (invoiceData.metadata) {
              try {
                const metadata = JSON.parse(invoiceData.metadata);
                if (metadata.design) {
                  setSelectedTemplate(metadata.design.template || "standard");
                  setSelectedColor(metadata.design.color || "blue");
                  setSelectedFont(metadata.design.font || "inter");
                  setCustomInvoiceTitle(metadata.design.title || "INVOICE");
                  setBusinessLogo(metadata.design.logo || "");
                }
                if (metadata.additional) {
                  setPurchaseOrderNumber(metadata.additional.poNumber || "");
                  setReferenceNumber(metadata.additional.refNumber || "");
                }
              } catch (e) {
                console.error("Error parsing invoice metadata", e);
              }
            }

            toast({
              title: "Invoice loaded",
              description:
                "You are now editing invoice #" + invoiceData.invoice_number,
            });
          }
        } catch (error) {
          console.error("Error fetching invoice:", error);
          toast({
            title: "Error",
            description: "Could not load invoice for editing",
            variant: "destructive",
          });
          navigate("/invoices");
        }
      }
    };

    fetchInvoice();
  }, [params.id, form, navigate, toast, getInvoice, location.state]);

  // Fetch business profile data
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileData) {
            // Set business details from profile
            if (profileData.business_name) {
              form.setValue("businessName", profileData.business_name);
            }
            if (profileData.business_address) {
              form.setValue("businessAddress", profileData.business_address);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchBusinessProfile();
  }, [form]);

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
      }),
    );
  };

  const handleAddItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([
      ...items,
      {
        id: newId,
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        serviceId: "",
      },
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
      // Prepare metadata for design settings
      const metadata = {
        design: {
          template: selectedTemplate,
          color: selectedColor,
          font: selectedFont,
          paperSize: selectedPaperSize,
          title: customInvoiceTitle,
          subtitle: customSubtitle,
          logo: businessLogo,
        },
        additional: {
          poNumber: purchaseOrderNumber,
          refNumber: referenceNumber,
          currency: selectedCurrency,
        },
        shipping: showShippingDetails ? {
          from: {
            name: data.shippedFromName,
            address: data.shippedFromAddress,
            city: data.shippedFromCity,
            state: data.shippedFromState,
            postal: data.shippedFromPostal,
            country: data.shippedFromCountry,
            warehouse: data.shippedFromWarehouse,
          },
          to: {
            name: data.shippedToName,
            address: data.shippedToAddress,
            city: data.shippedToCity,
            state: data.shippedToState,
            postal: data.shippedToPostal,
            country: data.shippedToCountry,
          }
        } : null,
        transport: showTransportDetails ? {
          transporter: data.transporterName,
          distance: data.distance,
          mode: data.transportMode,
          docNo: data.transportDocNo,
          docDate: data.transportDocDate,
          vehicleType: data.vehicleType,
          vehicleNumber: data.vehicleNumber,
          transactionType: data.transactionType,
          supplyType: data.supplyType,
        } : null,
        gst: {
          type: data.taxType,
          placeOfSupply: data.placeOfSupply,
          gstType: data.gstType,
          gstNumber: data.gstNumber,
          reverseCharge: data.gstReverseCharge,
          nonGstClient: data.nonGstClient,
        },
        payment: {
          bank: {
            name: data.bankName,
            accountNumber: data.accountNumber,
            ifscCode: data.ifscCode,
            accountHolderName: data.accountHolderName,
            branchName: data.branchName,
          },
          upi: {
            id: data.upiId,
            name: data.upiName,
          }
        }
      };

      // Prepare invoice data
      const invoiceData = {
        invoice_number: data.invoiceNumber,
        invoice_date: data.invoiceDate,
        due_date: data.dueDate,
        total_amount: calculateTotal(),
        client_id: data.clientId || null,
        notes: data.notes,
        terms: data.terms,
        status: "pending",
        metadata: JSON.stringify(metadata),
      };

      // Prepare invoice items
      const invoiceItems = items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unit_price: item.rate,
        amount: item.amount,
        service_id: item.serviceId || null,
      }));

      if (isEditMode && invoiceId) {
        // Update existing invoice
        await updateInvoice.mutateAsync({
          id: invoiceId,
          invoiceData: {
            ...invoiceData,
            invoice_items: invoiceItems,
          },
        });

        toast({
          title: "Invoice updated",
          description: "Your invoice has been updated successfully.",
        });
      } else {
        // Create new invoice
        const result = await createInvoice.mutateAsync(invoiceData);

        // If invoice was created successfully, add invoice items
        if (result && result.id) {
          // Insert invoice items
          await supabase.from("invoice_items").insert(
            invoiceItems.map((item) => ({
              ...item,
              invoice_id: result.id,
            })),
          );

          toast({
            title: "Invoice created",
            description: "Your invoice has been created successfully.",
          });
        }
      }

      navigate("/invoices");
    } catch (error: any) {
      console.error("Error with invoice:", error);
      toast({
        title: isEditMode ? "Error updating invoice" : "Error creating invoice",
        description:
          error.message ||
          `An error occurred while ${isEditMode ? "updating" : "creating"} the invoice`,
        variant: "destructive",
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
                <FormItem className="w-full">
                  <Input
                    className="text-2xl font-bold border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-playfair"
                    value={customInvoiceTitle}
                    onChange={(e) => setCustomInvoiceTitle(e.target.value)}
                    placeholder="INVOICE"
                  />
                </FormItem>
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

            {/* Invoice Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <Button
              type="button"
              variant="ghost"
              className="flex items-center text-sm"
              onClick={() => setShowAdditionalFields(!showAdditionalFields)}
            >
              <Plus className="h-4 w-4 mr-1" /> Add More Fields
            </Button>

            {showAdditionalFields && (
              <div className="space-y-4 pt-2 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Purchase Order Number</FormLabel>
                  <FormControl>
                    <Input
                      value={purchaseOrderNumber}
                      onChange={(e) =>
                        setPurchaseOrderNumber(e.target.value)
                      }
                      placeholder="Enter PO number"
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Reference Number</FormLabel>
                  <FormControl>
                    <Input
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                      placeholder="Enter reference number"
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}

            <Separator className="my-6" />

            {/* Billing Info */}
            <BillingDetailsForm 
              form={form} 
              clients={clients} 
              handleClientChange={handleClientChange} 
            />

            <Separator className="my-6" />

            {/* Shipping Details Toggle */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="shipping"
                checked={showShippingDetails}
                onCheckedChange={(checked) =>
                  setShowShippingDetails(!!checked)
                }
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
              <ShippingDetailsForm 
                form={form} 
                clientName={form.getValues("clientName")}
                clientAddress={form.getValues("clientAddress")}
              />
            )}

            <Separator className="my-6" />

            {/* Transport Details Toggle */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="transport"
                checked={showTransportDetails}
                onCheckedChange={(checked) =>
                  setShowTransportDetails(!!checked)
                }
              />
              <label
                htmlFor="transport"
                className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <Truck className="h-4 w-4 mr-1" /> Add Transport Details
              </label>
            </div>

            {showTransportDetails && (
              <TransportDetailsForm form={form} />
            )}

            <Separator className="my-6" />

            {/* GST Details Button */}
            <div className="flex items-center space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsGstDialogOpen(true)}
                className="flex items-center"
              >
                <FileCheck className="h-4 w-4 mr-2" /> Add GST Details
              </Button>
            </div>

            {/* GST Details Dialog */}
            <GstDetailsForm 
              open={isGstDialogOpen} 
              onOpenChange={setIsGstDialogOpen} 
              form={form} 
            />

            <Separator className="my-6" />

            <div>
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select
                  value={selectedCurrency}
                  onValueChange={setSelectedCurrency}
                >
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
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium font-playfair">
                  Invoice Items
                </h3>
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
                      <th className="text-right py-2 px-2 font-medium">
                        Rate (₹)
                      </th>
                      <th className="text-right py-2 px-2 font-medium">
                        Amount (₹)
                      </th>
                      <th className="py-2 px-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 px-2">
                          <Input
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "description",
                                e.target.value,
                              )
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
                                parseInt(e.target.value) || 0,
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
                                  parseFloat(e.target.value) || 0,
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
            <PaymentOptionsForm form={form} />

            <div className="space-y-4 mt-8">
              <h3 className="text-lg font-medium font-playfair">
                Additional Information
              </h3>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (visible to client)</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
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
                      <textarea
                        className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
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
                <div className="text-center p-6 border rounded-lg bg-muted/10">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-4">
                    Design options will be available in the next update
                  </p>
                </div>
              </div>

              {/* Design Preview */}
              <div className="text-center p-6 border rounded-lg bg-muted/10">
                <p className="mt-4">
                  Preview will be available in the next update
                </p>
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
            <h1 className="text-2xl font-bold font-playfair">
              {isEditMode ? "Edit Invoice" : "Create New Invoice"}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode
                ? "Update invoice details, items, and design"
                : "Create a new invoice for your clients"}
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
                        {isEditMode ? "Update Invoice" : "Save Invoice"}
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
