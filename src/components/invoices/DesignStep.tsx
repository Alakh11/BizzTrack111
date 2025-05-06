
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvoiceTemplates from "@/components/invoices/InvoiceTemplates";
import LogoUpload from "./LogoUpload";
import FontSelector from "./design/FontSelector";
import ColorSelector from "./design/ColorSelector";

interface DesignStepProps {
  form: UseFormReturn<any>;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  selectedPaperSize: string;
  setSelectedPaperSize: (size: string) => void;
  businessLogo: string;
  setBusinessLogo: (logo: string) => void;
  templates: Array<{
    id: string;
    name: string;
    preview: string;
  }>;
}

const DesignStep = ({
  form,
  selectedTemplate,
  setSelectedTemplate,
  selectedColor,
  setSelectedColor,
  selectedFont,
  setSelectedFont,
  selectedPaperSize,
  setSelectedPaperSize,
  businessLogo,
  setBusinessLogo,
  templates,
}: DesignStepProps) => {
  // Paper sizes with dimensions
  const paperSizes = [
    { id: "a4", name: "A4", dimensions: "210 × 297 mm" },
    { id: "letter", name: "US Letter", dimensions: "215.9 × 279.4 mm" },
    { id: "legal", name: "US Legal", dimensions: "215.9 × 355.6 mm" },
    { id: "a3", name: "A3", dimensions: "297 × 420 mm" }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="colors">Colors & Fonts</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <InvoiceTemplates selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Color</CardTitle>
              </CardHeader>
              <CardContent>
                <ColorSelector selectedColor={selectedColor} onChange={setSelectedColor} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent>
                <FontSelector value={selectedFont} onChange={setSelectedFont} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Branding</CardTitle>
            </CardHeader>
            <CardContent>
              <LogoUpload 
                onUpload={setBusinessLogo}
                currentLogo={businessLogo}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paper Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium">Paper Size</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {paperSizes.map((size) => (
                    <div
                      key={size.id}
                      className={`border rounded-md p-3 text-center cursor-pointer hover:bg-muted transition-colors ${
                        selectedPaperSize === size.id
                          ? "border-primary bg-primary/10"
                          : ""
                      }`}
                      onClick={() => setSelectedPaperSize(size.id)}
                    >
                      <p className="font-medium">{size.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {size.dimensions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="w-full">
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Digital Signature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium">Signature</label>
              <textarea
                className="w-full rounded-md border p-2 h-20 dark:bg-gray-800 bg-white"
                placeholder="Type your name to create a digital signature"
                {...form.register("signature")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DesignStep;
