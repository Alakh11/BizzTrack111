
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { 
  LayoutTemplate, 
  PaintBucket, 
  Type, 
  FileText, 
  FileSignature, 
  Paperclip,
  FileImage
} from "lucide-react";

// Sample invoice template images
const templateImages = {
  standard:
    "https://square-mailstrom-production.s3.amazonaws.com/invoices/templates/img/en-us-invoice-template-576474.jpg?v=2",
  professional: "https://i.imgur.com/l2O3M5j.png",
  modern: "https://i.imgur.com/DFg6QiK.png",
  classic: "https://i.imgur.com/CtbuDF6.png",
  simple: "https://i.imgur.com/sO17jcA.png",
};

interface InvoiceTemplatesProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  selectedFont: string;
  onFontSelect: (font: string) => void;
  selectedPaperSize: string;
  onPaperSizeSelect: (size: string) => void;
}

const InvoiceTemplates: React.FC<InvoiceTemplatesProps> = ({
  selectedTemplate,
  onTemplateSelect,
  selectedColor,
  onColorSelect,
  selectedFont,
  onFontSelect,
  selectedPaperSize,
  onPaperSizeSelect,
}) => {
  const [watermarkText, setWatermarkText] = useState("");
  const [showFooter, setShowFooter] = useState(false);
  const [footerText, setFooterText] = useState("");
  const [showLetterhead, setShowLetterhead] = useState(false);
  const [letterheadText, setLetterheadText] = useState("");
  const [margins, setMargins] = useState("normal");
  const [textScale, setTextScale] = useState("100");
  const [generatePagelessPDF, setGeneratePagelessPDF] = useState(false);
  
  const form = useForm({
    defaultValues: {
      watermarkText: "",
      footerText: "",
      letterheadText: "",
      margins: "normal",
      textScale: "100",
    },
  });

  const templates = [
    { id: "standard", name: "Standard", image: templateImages.standard },
    {
      id: "professional",
      name: "Professional",
      image: templateImages.professional,
    },
    { id: "modern", name: "Modern", image: templateImages.modern },
    { id: "classic", name: "Classic", image: templateImages.classic },
    { id: "simple", name: "Simple", image: templateImages.simple },
  ];

  // Color options UI
  const colorOptions = [
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

  // Paper size options
  const paperSizes = [
    { id: "a4", name: "A4" },
    { id: "letter", name: "Letter" },
    { id: "legal", name: "Legal" },
    { id: "a3", name: "A3" },
  ];
  
  // Margin options
  const marginOptions = [
    { id: "none", name: "None" },
    { id: "narrow", name: "Narrow" },
    { id: "normal", name: "Normal" },
    { id: "wide", name: "Wide" },
  ];
  
  // Text scale options
  const textScaleOptions = [
    { id: "90", name: "90%" },
    { id: "100", name: "100%" },
    { id: "110", name: "110%" },
    { id: "120", name: "120%" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Design & Customize Invoice</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Template selection */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Invoice Template</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-md cursor-pointer overflow-hidden transition-all hover:shadow-md ${
                    selectedTemplate === template.id
                      ? "ring-2 ring-primary border-primary"
                      : ""
                  }`}
                  onClick={() => onTemplateSelect(template.id)}
                >
                  <div className="aspect-[3/4]">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 text-center text-sm font-medium">
                    {template.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Page Setup</h3>
            </div>
            
            <Form {...form}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="paperSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paper Size</FormLabel>
                      <Select 
                        value={selectedPaperSize} 
                        onValueChange={onPaperSizeSelect}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select paper size" />
                        </SelectTrigger>
                        <SelectContent>
                          {paperSizes.map((size) => (
                            <SelectItem key={size.id} value={size.id}>
                              {size.name}
                            </SelectItem>
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
                      <Select 
                        value={margins} 
                        onValueChange={setMargins}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select margins" />
                        </SelectTrigger>
                        <SelectContent>
                          {marginOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
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
                      <Select 
                        value={textScale} 
                        onValueChange={setTextScale}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select text scale" />
                        </SelectTrigger>
                        <SelectContent>
                          {textScaleOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Generate Pageless PDF</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={generatePagelessPDF}
                      onCheckedChange={setGeneratePagelessPDF}
                    />
                  </FormControl>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>

        {/* Middle column - Colors and Fonts */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PaintBucket className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Color Theme</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color) => (
                <div
                  key={color.id}
                  className={`w-10 h-10 rounded-full cursor-pointer transition-all hover:scale-110 ${
                    selectedColor === color.id
                      ? "ring-2 ring-offset-2 ring-gray-400"
                      : ""
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => onColorSelect(color.id)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Font Style</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {fontOptions.map((font) => (
                <div
                  key={font.id}
                  className={`px-3 py-2 border rounded-md cursor-pointer text-center transition-colors ${
                    selectedFont === font.id
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => onFontSelect(font.id)}
                >
                  {font.name}
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileSignature className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Letterhead & Branding</h3>
            </div>
            
            <Form {...form}>
              <div className="space-y-4">
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Add letterhead</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={showLetterhead}
                      onCheckedChange={setShowLetterhead}
                    />
                  </FormControl>
                </FormItem>
                
                {showLetterhead && (
                  <FormField
                    control={form.control}
                    name="letterheadText"
                    render={({ field }) => (
                      <FormItem>
                        <Textarea
                          placeholder="Enter letterhead text"
                          value={letterheadText}
                          onChange={(e) => setLetterheadText(e.target.value)}
                          className="resize-none"
                          rows={3}
                        />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Add custom footer</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={showFooter}
                      onCheckedChange={setShowFooter}
                    />
                  </FormControl>
                </FormItem>
                
                {showFooter && (
                  <FormField
                    control={form.control}
                    name="footerText"
                    render={({ field }) => (
                      <FormItem>
                        <Textarea
                          placeholder="Enter footer text"
                          value={footerText}
                          onChange={(e) => setFooterText(e.target.value)}
                          className="resize-none"
                          rows={2}
                        />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Add watermark</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={watermarkText.length > 0}
                      onCheckedChange={(checked) => {
                        if (!checked) setWatermarkText("");
                      }}
                    />
                  </FormControl>
                </FormItem>
                
                {watermarkText.length > 0 || watermarkText === "" ? (
                  <FormField
                    control={form.control}
                    name="watermarkText"
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          placeholder="Enter watermark text"
                          value={watermarkText}
                          onChange={(e) => setWatermarkText(e.target.value)}
                        />
                      </FormItem>
                    )}
                  />
                ) : null}
              </div>
            </Form>
          </div>
        </div>

        {/* Right column - Preview */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileImage className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Invoice Preview</h3>
          </div>
          <Card className="shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[1/1.414] bg-gray-50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-muted-foreground mb-2">
                      Preview will update as you make changes
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <p>Template: {templates.find(t => t.id === selectedTemplate)?.name}</p>
                      <p>Color: {colorOptions.find(c => c.id === selectedColor)?.name}</p>
                      <p>Font: {fontOptions.find(f => f.id === selectedFont)?.name}</p>
                      <p>Paper: {paperSizes.find(p => p.id === selectedPaperSize)?.name}</p>
                      {margins !== "normal" && <p>Margins: {marginOptions.find(m => m.id === margins)?.name}</p>}
                      {textScale !== "100" && <p>Text Scale: {textScale}%</p>}
                      {generatePagelessPDF && <p>Pageless PDF: Yes</p>}
                      {watermarkText && <p>Watermark: Applied</p>}
                      {showFooter && <p>Custom Footer: Applied</p>}
                      {showLetterhead && <p>Letterhead: Applied</p>}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="mb-2"><strong>Note:</strong> These design options will be saved with your invoice and applied when generating the final PDF.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplates;
