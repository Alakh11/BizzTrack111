
import React from "react";
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
                </TabsList>
                <TabsContent value="templates" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className={`border p-2 rounded-md cursor-pointer aspect-[3/4] flex items-center justify-center ${selectedTemplate === 'standard' ? 'border-primary ring-2 ring-primary/20' : ''}`}
                      onClick={() => setSelectedTemplate('standard')}
                    >
                      <div className="text-center">
                        <p className="font-medium">Standard</p>
                        <p className="text-xs text-muted-foreground">Basic invoice layout</p>
                      </div>
                    </div>
                    
                    <div 
                      className={`border p-2 rounded-md cursor-pointer aspect-[3/4] flex items-center justify-center ${selectedTemplate === 'modern' ? 'border-primary ring-2 ring-primary/20' : ''}`}
                      onClick={() => setSelectedTemplate('modern')}
                    >
                      <div className="text-center">
                        <p className="font-medium">Modern</p>
                        <p className="text-xs text-muted-foreground">Clean, modern design</p>
                      </div>
                    </div>
                    
                    <div 
                      className={`border p-2 rounded-md cursor-pointer aspect-[3/4] flex items-center justify-center ${selectedTemplate === 'professional' ? 'border-primary ring-2 ring-primary/20' : ''}`}
                      onClick={() => setSelectedTemplate('professional')}
                    >
                      <div className="text-center">
                        <p className="font-medium">Professional</p>
                        <p className="text-xs text-muted-foreground">Corporate style</p>
                      </div>
                    </div>
                    
                    <div 
                      className={`border p-2 rounded-md cursor-pointer aspect-[3/4] flex items-center justify-center ${selectedTemplate === 'minimal' ? 'border-primary ring-2 ring-primary/20' : ''}`}
                      onClick={() => setSelectedTemplate('minimal')}
                    >
                      <div className="text-center">
                        <p className="font-medium">Minimal</p>
                        <p className="text-xs text-muted-foreground">Simple and clean</p>
                      </div>
                    </div>
                  </div>
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
                    <h2 className="text-xl font-bold" style={{ color: selectedColor }}>INVOICE</h2>
                    <p className="text-sm text-muted-foreground">#INV-2023-001</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground">From:</p>
                    <p className="font-medium">Your Business Name</p>
                    <p className="text-sm">123 Business Street</p>
                    <p className="text-sm">City, State, ZIP</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">To:</p>
                    <p className="font-medium">Client Name</p>
                    <p className="text-sm">456 Client Address</p>
                    <p className="text-sm">City, State, ZIP</p>
                  </div>
                </div>
                
                <div className="border-t border-b py-2 mb-4 grid grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Invoice Date</p>
                    <p className="text-sm">May 5, 2025</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Due Date</p>
                    <p className="text-sm">May 19, 2025</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm">Pending</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount Due</p>
                    <p className="text-sm font-semibold">$1,234.56</p>
                  </div>
                </div>
                
                <div className="text-xs mb-4">
                  <div className="grid grid-cols-12 font-medium mb-1">
                    <div className="col-span-6">Item</div>
                    <div className="col-span-2 text-right">Qty</div>
                    <div className="col-span-2 text-right">Rate</div>
                    <div className="col-span-2 text-right">Amount</div>
                  </div>
                  <div className="grid grid-cols-12 mb-1">
                    <div className="col-span-6">Product Name</div>
                    <div className="col-span-2 text-right">2</div>
                    <div className="col-span-2 text-right">$100.00</div>
                    <div className="col-span-2 text-right">$200.00</div>
                  </div>
                </div>
                
                <div className="text-right text-sm mt-4 mb-2">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-bold">$200.00</span>
                  </div>
                </div>
                
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
