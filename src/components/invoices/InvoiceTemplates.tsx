import React from "react";

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
  setSelectedTemplate: (template: string) => void;
}

const InvoiceTemplates: React.FC<InvoiceTemplatesProps> = ({
  selectedTemplate,
  setSelectedTemplate,
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`border rounded-md cursor-pointer overflow-hidden transition-all hover:shadow-md ${selectedTemplate === template.id ? "ring-2 ring-primary border-primary" : ""}`}
          onClick={() => setSelectedTemplate(template.id)}
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
  );
};

export default InvoiceTemplates;
