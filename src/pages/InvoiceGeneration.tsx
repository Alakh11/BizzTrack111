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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IndianRupee,
  Plus,
  Trash,
  ArrowRight,
  PenSquare,
  LayoutTemplate,
  PaintBucket,
  Type,
  FileImage,
  FileText,
  Truck,
  Receipt,
  FileSignature,
  Paperclip,
  InfoIcon,
  Phone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InvoiceSteps from "@/components/invoices/InvoiceSteps";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useClients } from "@/hooks/useClients";
import { useInvoices } from "@/hooks/useInvoices";
import { supabase } from "@/integrations/supabase/client";
import InvoiceTemplates from "@/components/invoices/InvoiceTemplates";
import LogoUpload from "@/components/invoices/LogoUpload";
import ShippingDetails from "@/components/invoices/ShippingDetails";
import TransporterDetails from "@/components/invoices/TransporterDetails";
import GstDetails from "@/components/invoices/GstDetails";
import PaymentOptions from "@/components/invoices/PaymentOptions";
import EditableBillingSection from "@/components/invoices/EditableBillingSection";
import CreateClientDialog from "@/components/clients/CreateClientDialog";
import InvoiceHeader from "@/components/invoices/InvoiceHeader";
import InvoiceDetails from "@/components/invoices/InvoiceDetails";
import InvoiceItems from "@/components/invoices/InvoiceItems";
import CurrencySelector from "@/components/invoices/CurrencySelector";

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

// Color themes
const colorThemes = [
  { id: "blue", name: "Blue", color: "#3b82f6" },
  { id: "green", name: "Green", color: "#10b981" },
  { id: "purple", name: "Purple", color: "#8b5cf6" },
  { id: "orange", name: "Orange", color: "#f97316" },
  { id: "red", name: "Red", color: "#ef4444" },
  { id: "gray", name: "Gray", color: "#6b7280" },
];

const InvoiceGeneration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, rate: 0, amount: 0, serviceId: "" },
  ]);
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [showTransporterDetails, setShowTransporterDetails] = useState(false);
  const [showGstDetails, setShowGstDetails] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
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
  const [gstConfig, setGstConfig] = useState<any>(null);
  const [isCreateClientDialogOpen, setIsCreateClientDialogOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({
    name: "Alakh Corporation",
    address: "Mirzapur, UP, India - 231312",
    phone: "+91 9580813770",
    email: "alakh1304@gmail.com",
  });
  const [clientDetails, setClientDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

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
      // Shipping details fields
      shippedFromWarehouse: "",
      shippedFromName: "",
      shippedFromCountry: "in",
      shippedFromAddress: "",
      shippedFromCity: "",
      shippedFromPostalCode: "",
      shippedFromState: "",
      shippedToName: "",
      shippedToCountry: "in",
      shippedToAddress: "",
      shippedToCity: "",
      shippedToPostalCode: "",
      shippedToState: "",
      // Transporter details
      transporter: "",
      distance: "",
      transportMode: "",
      transportDocNo: "",
      transportDocDate: "",
      vehicleType: "",
      vehicleNumber: "",
      transactionType: "",
      subSupplyType: "",
      // Payment details
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      swiftCode: "",
      upiId: "",
      upiDisplayName: "",
      // Additional details
      notes: "",
      terms: "Payment is due within 14 days of issue.",
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
              
              setClientDetails({
                name: invoiceData.client.name || "",
                address: invoiceData.client.address || "",
                phone: invoiceData.client.phone || "",
                email: invoiceData.client.email || "",
              });
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
                if (metadata.shipping) {
                  setShowShippingDetails(true);
                  // Set shipping fields
                }
                if (metadata.gst) {
                  setGstConfig(metadata.gst);
                  setShowGstDetails(true);
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
            // Update business details if available
            setBusinessDetails({
              name: profileData.business_name || "Alakh Corporation",
              address: profileData.business_address || "Mirzapur, UP, India - 231312",
              phone: profileData.phone || "+91 9580813770",
              email: session.user.email || "alakh1304@gmail.com",
            });
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
      
      // Update client details state
      setClientDetails({
        name: selectedClient.name || "",
        address: selectedClient.address || "",
        phone: selectedClient.phone || "",
        email: selectedClient.email || "",
      });
    }
  };

  const handleBusinessDetailsUpdate = (details: any) => {
    setBusinessDetails(details);
  };
  
  const handleClientDetailsUpdate = (details: any) => {
    setClientDetails(details);
    form.setValue("clientName", details.name);
    form.setValue("clientAddress", details.address);
    form.setValue("clientEmail", details.email);
    form.setValue("clientPhone", details.phone);
  };

  const handleGstConfigSave = (config: any) => {
    setGstConfig(config);
    setShowGstDetails(false);
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
          shippedFrom: {
            warehouse: data.shippedFromWarehouse,
            name: data.shippedFromName,
            country: data.shippedFromCountry,
            address: data.shippedFromAddress,
            city: data.shippedFromCity,
            postalCode: data.shippedFromPostalCode,
            state: data.shippedFromState,
          },
          shippedTo: {
            name: data.shippedToName,
            country: data.shippedToCountry,
            address: data.shippedToAddress,
            city: data.shippedToCity,
            postalCode: data.shippedToPostalCode,
            state: data.shippedToState,
          }
        } : null,
        transporter: showTransporterDetails ? {
          transporter: data.transporter,
          distance: data.distance,
          transportMode: data.transportMode,
          transportDocNo: data.transportDocNo,
          transportDocDate: data.transportDocDate,
          vehicleType: data.vehicleType,
          vehicleNumber: data.vehicleNumber,
          transactionType: data.transactionType,
          subSupplyType: data.subSupplyType,
        } : null,
        gst: gstConfig,
        payment: {
          method: data.upiId ? "upi" : "bank",
          bank: {
            name: data.bankName,
            accountNumber: data.accountNumber,
            ifscCode: data.ifscCode,
            accountHolderName: data.accountHolderName,
            swiftCode: data.swiftCode,
          },
          upi: {
            id: data.upiId,
            displayName: data.upiDisplayName,
          }
        },
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
            <InvoiceHeader
              customInvoiceTitle={customInvoiceTitle}
              customSubtitle={customSubtitle}
              onTitleChange={setCustomInvoiceTitle}
              onSubtitleChange={setCustomSubtitle}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InvoiceDetails
                form={form}
                showAdditionalFields={showAdditionalFields}
                setShowAdditionalFields={setShowAdditionalFields}
                purchaseOrderNumber={purchaseOrderNumber}
                setPurchaseOrderNumber={setPurchaseOrderNumber}
                referenceNumber={referenceNumber}
                setReferenceNumber={setReferenceNumber}
              />

              <div className="space-y-8">
                <EditableBillingSection 
                  title="Billed By (Your Details)"
                  defaultDetails={businessDetails}
                  onSave={handleBusinessDetailsUpdate}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium font-playfair">
                    Billed To (Client's Details)
                  </h3>

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
                        {clients &&
                          clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsCreateClientDialogOpen(true)}
                    >
                      Add New Client
                    </Button>
                  </div>

                  <CreateClientDialog
                    open={isCreateClientDialogOpen}
                    onOpenChange={setIsCreateClientDialogOpen}
                  />

                  {form.getValues("clientId") ? (
                    <EditableBillingSection
                      title=""
                      defaultDetails={clientDetails}
                      onSave={handleClientDetailsUpdate}
                    />
                  ) : (
                    <Card className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="text-sm text-center text-muted-foreground py-6">
                          Select a client to show details or click "Add New Client"
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-8">
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
                  className="text-sm font-medium leading-none"
                >
                  Add Shipping Details
                </label>
              </div>

              {showShippingDetails && (
                <div className="space-y-4 pt-2 border-t">
                  <ShippingDetails form={form} />
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <InvoiceItems
              items={items}
              onItemChange={handleItemChange}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />

            <div className="mt-6">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <PaymentOptions form={form} />
        );
      case 2:
        return (
          <div className="space-y-8">
            <InvoiceTemplates
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
              selectedFont={selectedFont}
              onFontSelect={setSelectedFont}
              selectedPaperSize={selectedPaperSize}
              onPaperSizeSelect={setSelectedPaperSize}
            />
            <LogoUpload
              businessLogo={businessLogo}
              onLogoUpload={setBusinessLogo}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <InvoiceSteps
          steps={steps}
          currentStep={currentStep}
          onStepChange={handleStepChange}
        />

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardContent className="p-6">
                {renderStepContent()}

                <div className="flex justify-between mt-8">
                  {currentStep > 0 && (
                    <Button type="button" onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}
                  <div className="flex justify-end flex-1">
                    {currentStep < steps.length - 1 ? (
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit">
                        {isEditMode ? "Update" : "Create"} Invoice
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default InvoiceGeneration;
