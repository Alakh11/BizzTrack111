
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Invoice Template</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Color Theme</h3>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <div
              key={color.id}
              className={`w-8 h-8 rounded-full cursor-pointer ${
                selectedColor === color.id
                  ? "ring-2 ring-offset-2 ring-gray-400"
                  : ""
              }`}
              style={{ backgroundColor: color.color }}
              onClick={() => onColorSelect(color.id)}
              title={color.name}
            ></div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Font</h3>
        <div className="flex flex-wrap gap-2">
          {fontOptions.map((font) => (
            <div
              key={font.id}
              className={`px-3 py-1 border rounded-md cursor-pointer ${
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Paper Size</h3>
        <div className="flex flex-wrap gap-2">
          {paperSizes.map((size) => (
            <div
              key={size.id}
              className={`px-3 py-1 border rounded-md cursor-pointer ${
                selectedPaperSize === size.id
                  ? "bg-primary/10 border-primary"
                  : "hover:bg-muted"
              }`}
              onClick={() => onPaperSizeSelect(size.id)}
            >
              {size.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Invoice Preview</h3>
        <Card className="shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-[1/1.414] bg-gray-50 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-muted-foreground">
                    Preview will be available soon
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceTemplates;
