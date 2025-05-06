
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvoiceTemplates from "@/components/invoices/InvoiceTemplates";
import LogoUpload from "./LogoUpload";
import FontSelector from "./design/FontSelector";
import ColorSelector from "./design/ColorSelector";
import PaperSizeSelector from "./design/PaperSizeSelector";
import DigitalSignature from "./design/DigitalSignature";

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
  return (
    <div className="space-y-6">
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-4">
          <TabsTrigger value="templates" className="dark:data-[state=active]:bg-white dark:data-[state=active]:text-black">Templates</TabsTrigger>
          <TabsTrigger value="colors" className="dark:data-[state=active]:bg-white dark:data-[state=active]:text-black">Colors & Fonts</TabsTrigger>
          <TabsTrigger value="branding" className="dark:data-[state=active]:bg-white dark:data-[state=active]:text-black">Branding</TabsTrigger>
          <TabsTrigger value="advanced" className="dark:data-[state=active]:bg-white dark:data-[state=active]:text-black">Advanced</TabsTrigger>
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
              <PaperSizeSelector 
                selectedPaperSize={selectedPaperSize}
                setSelectedPaperSize={setSelectedPaperSize}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DigitalSignature form={form} />
      </div>
    </div>
  );
};

export default DesignStep;
