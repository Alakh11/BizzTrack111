import React, { useRef, useState, useEffect } from "react";
import { FileText } from "lucide-react";
import InvoiceTemplates from "./InvoiceTemplates";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DesignStepProps {
  form: UseFormReturn<any>;
  selectedTemplate: string;
  selectedColor: string;
  selectedFont: string;
  selectedPaperSize: string;
  businessLogo: string;
  setSelectedTemplate: (template: string) => void;
  setSelectedColor: (color: string) => void;
  setSelectedFont: (font: string) => void;
  setSelectedPaperSize: (size: string) => void;
  setBusinessLogo: (logo: string) => void;
}

const DesignStep: React.FC<DesignStepProps> = ({
  form,
  selectedTemplate,
  selectedColor,
  selectedFont,
  selectedPaperSize,
  businessLogo,
  setSelectedTemplate,
  setSelectedColor,
  setSelectedFont,
  setSelectedPaperSize,
  setBusinessLogo
}) => {
  const [signature, setSignature] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [previewData, setPreviewData] = useState<any>({
    clientName: "Client Name",
    invoiceNumber: "INV-2023-001",
    invoiceDate: "May 5, 2025",
    dueDate: "May 19, 2025",
    total: "$200.00",
    items: [{ description: "Product Name", quantity: 2, rate: "$100.00", amount: "$200.00" }]
  });
  
  // Update preview with real form data
  useEffect(() => {
    const formValues = form.getValues();
    if (formValues) {
      // Calculate currency symbol
      const currencySymbol = formValues.selectedCurrency === 'usd' ? '$' : 
                            formValues.selectedCurrency === 'eur' ? '€' : 
                            formValues.selectedCurrency === 'gbp' ? '£' : '₹';
      
      // Calculate total
      const total = formValues.items?.reduce((sum: number, item: any) => 
        sum + (parseFloat(item.amount) || 0), 0) || 0;
      
      const newPreviewData = {
        clientName: formValues.clientName || "Client Name",
        clientAddress: formValues.clientAddress || "Client Address",
        clientEmail: formValues.clientEmail || "client@example.com",
        invoiceNumber: formValues.invoiceNumber || "INV-2023-001",
        invoiceDate: formValues.invoiceDate ? new Date(formValues.invoiceDate).toLocaleDateString() : "May 5, 2025",
        dueDate: formValues.dueDate ? new Date(formValues.dueDate).toLocaleDateString() : "May 19, 2025",
        total: `${currencySymbol}${total.toFixed(2)}`,
        items: formValues.items || [{ description: "Product Name", quantity: 2, rate: "$100.00", amount: "$200.00" }],
        gstNumber: formValues.gstNumber || "",
        shippingDetails: {
          from: {
            name: formValues.shippedFromName || "",
            address: formValues.shippedFromAddress || "",
          },
          to: {
            name: formValues.shippedToName || "",
            address: formValues.shippedToAddress || "",
          }
        },
        notes: formValues.notes || "",
        terms: formValues.terms || ""
      };
      setPreviewData(newPreviewData);
    }
  }, [form, form.watch()]);
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setBusinessLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(
      e.nativeEvent.offsetX, 
      e.nativeEvent.offsetY
    );
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    
    ctx.lineTo(
      e.nativeEvent.offsetX, 
      e.nativeEvent.offsetY
    );
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setSignature(canvas.toDataURL('image/png'));
    form.setValue("signature", canvas.toDataURL('image/png'));
  };
  
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature("");
    form.setValue("signature", "");
  };

  const getColorStyles = (color: string) => {
    // Convert simple color names to proper hex or tailwind-like colors
    switch(color) {
      case 'blue': return { textColor: '#3B82F6', accentColor: '#60A5FA' };
      case 'green': return { textColor: '#10B981', accentColor: '#34D399' };
      case 'red': return { textColor: '#EF4444', accentColor: '#F87171' };
      case 'purple': return { textColor: '#8B5CF6', accentColor: '#A78BFA' };
      case 'orange': return { textColor: '#F97316', accentColor: '#FB923C' };
      case 'teal': return { textColor: '#14B8A6', accentColor: '#2DD4BF' };
      case 'pink': return { textColor: '#EC4899', accentColor: '#F472B6' };
      case 'gray': return { textColor: '#4B5563', accentColor: '#9CA3AF' };
      case 'black': return { textColor: '#1F2937', accentColor: '#4B5563' };
      case 'indigo': return { textColor: '#6366F1', accentColor: '#818CF8' };
      default: return { textColor: '#3B82F6', accentColor: '#60A5FA' };
    }
  };

  const colorStyles = getColorStyles(selectedColor);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Design Options */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="templates">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
                  <TabsTrigger value="colors" className="flex-1">Colors</TabsTrigger>
                  <TabsTrigger value="fonts" className="flex-1">Fonts</TabsTrigger>
                  <TabsTrigger value="signature" className="flex-1">Signature</TabsTrigger>
                </TabsList>
                <TabsContent value="templates" className="space-y-4">
                  <InvoiceTemplates 
                    selectedTemplate={selectedTemplate} 
                    setSelectedTemplate={setSelectedTemplate} 
                  />
                </TabsContent>
                
                <TabsContent value="colors" className="space-y-4">
                  <Label>Choose Primary Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {['blue', 'green', 'red', 'purple', 'orange', 'teal', 'pink', 'gray', 'black', 'indigo'].map((color) => (
                      <div 
                        key={color}
                        className={`w-10 h-10 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'ring-2 ring-offset-2' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="fonts" className="space-y-4">
                  <Label>Font Family</Label>
                  <RadioGroup value={selectedFont} onValueChange={setSelectedFont}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="inter" id="font-inter" />
                      <Label htmlFor="font-inter" className="font-['Inter']">Inter</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="roboto" id="font-roboto" />
                      <Label htmlFor="font-roboto" className="font-['Roboto']">Roboto</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="poppins" id="font-poppins" />
                      <Label htmlFor="font-poppins" className="font-['Poppins']">Poppins</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="montserrat" id="font-montserrat" />
                      <Label htmlFor="font-montserrat" className="font-['Montserrat']">Montserrat</Label>
                    </div>
                  </RadioGroup>
                </TabsContent>
                
                <TabsContent value="signature" className="space-y-4">
                  <Label>Digital Signature</Label>
                  <div className="border rounded-md p-2">
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={150}
                      className="border rounded-md w-full bg-white"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={clearSignature}
                        className="text-sm"
                      >
                        Clear Signature
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Draw your signature above. It will be included in the final invoice.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Paper Size</Label>
                <Select value={selectedPaperSize} onValueChange={setSelectedPaperSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select paper size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex flex-col space-y-2">
                  {businessLogo && (
                    <div className="mb-2 border p-2 rounded-md">
                      <img 
                        src={businessLogo} 
                        alt="Business Logo" 
                        className="max-h-24 max-w-full mx-auto"
                      />
                    </div>
                  )}
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoUpload} 
                    className="cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Watermark Text (Optional)</Label>
                <Input {...form.register("watermarkText")} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Design Preview */}
        <Card className="p-6 h-full">
          <div className="h-full flex flex-col">
            <h3 className="text-lg font-medium mb-4">Preview</h3>
            <div className="flex-grow bg-muted/10 border rounded-md p-4 flex items-center justify-center">
              <div className={`w-full max-w-md p-6 border rounded-md bg-white shadow-sm font-${selectedFont}`}>
                <div className="flex justify-between items-start mb-6">
                  {businessLogo ? (
                    <img src={businessLogo} alt="Logo" className="h-12 max-w-[120px] object-contain" />
                  ) : (
                    <div className="h-12 w-32 bg-muted/20 rounded flex items-center justify-center text-xs text-muted-foreground">
                      Your Logo
                    </div>
                  )}
                  <div className="text-right">
                    <h2 className="text-xl font-bold" style={{ color: colorStyles.textColor }}>INVOICE</h2>
                    <p className="text-sm text-muted-foreground">#{previewData.invoiceNumber}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground">From:</p>
                    <p className="font-medium">{form.getValues("businessName") || "Your Business"}</p>
                    <p className="text-sm">{form.getValues("businessAddress") || "Business Address"}</p>
                    <p className="text-sm">{form.getValues("businessPhone") || ""}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">To:</p>
                    <p className="font-medium">{previewData.clientName}</p>
                    <p className="text-sm">{previewData.clientAddress || "Client Address"}</p>
                    <p className="text-sm">{previewData.clientEmail || "client@example.com"}</p>
                  </div>
                </div>
                
                {previewData.gstNumber && (
                  <div className="border-t border-b py-2 mb-4">
                    <p className="text-xs text-muted-foreground">GST Number: {previewData.gstNumber}</p>
                  </div>
                )}
                
                <div className="border-t border-b py-2 mb-4 grid grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Invoice Date</p>
                    <p className="text-sm">{previewData.invoiceDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Due Date</p>
                    <p className="text-sm">{previewData.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm">Pending</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount Due</p>
                    <p className="text-sm font-semibold" style={{ color: colorStyles.textColor }}>{previewData.total}</p>
                  </div>
                </div>
                
                <div className="text-xs mb-4">
                  <div className="grid grid-cols-12 font-medium mb-1">
                    <div className="col-span-6">Item</div>
                    <div className="col-span-2 text-right">Qty</div>
                    <div className="col-span-2 text-right">Rate</div>
                    <div className="col-span-2 text-right">Amount</div>
                  </div>
                  {previewData.items && previewData.items.slice(0, 3).map((item: any, index: number) => (
                    <div className="grid grid-cols-12 mb-1" key={index}>
                      <div className="col-span-6 truncate">{item.description || "Product"}</div>
                      <div className="col-span-2 text-right">{item.quantity || 1}</div>
                      <div className="col-span-2 text-right">{item.rate || 0}</div>
                      <div className="col-span-2 text-right">{item.amount || 0}</div>
                    </div>
                  ))}
                </div>
                
                <div className="text-right text-sm mt-4 mb-2">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-bold" style={{ color: colorStyles.textColor }}>{previewData.total}</span>
                  </div>
                </div>
                
                {/* Show shipping details if available */}
                {(previewData.shippingDetails?.from?.name || previewData.shippingDetails?.to?.name) && (
                  <div className="text-xs border-t pt-2 mt-3">
                    <p className="font-medium">Shipping Details:</p>
                    {previewData.shippingDetails.from.name && (
                      <p>From: {previewData.shippingDetails.from.name}, {previewData.shippingDetails.from.address}</p>
                    )}
                    {previewData.shippingDetails.to.name && (
                      <p>To: {previewData.shippingDetails.to.name}, {previewData.shippingDetails.to.address}</p>
                    )}
                  </div>
                )}
                
                {signature && (
                  <div className="mt-6 pt-4 text-right">
                    <img src={signature} alt="Signature" className="max-h-16 inline-block" />
                    <p className="text-xs mt-1 border-t border-gray-300 inline-block pt-1">Authorized Signature</p>
                  </div>
                )}
                
                {(previewData.notes || previewData.terms) && (
                  <div className="text-xs text-muted-foreground mt-4 border-t pt-2">
                    {previewData.notes && <p className="mb-1"><strong>Notes:</strong> {previewData.notes}</p>}
                    {previewData.terms && <p><strong>Terms:</strong> {previewData.terms}</p>}
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground text-center mt-6 border-t pt-2">
                  Thank you for your business
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DesignStep;
