import React from "react";
import { useInvoiceDesign } from "@/hooks/useInvoiceDesign";

interface InvoiceTemplatesProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const InvoiceTemplates: React.FC<InvoiceTemplatesProps> = ({
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const { templates } = useInvoiceDesign();

  const handleTemplateSelection = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`border rounded-md cursor-pointer overflow-hidden transition-all hover:shadow-md ${
            selectedTemplate === template.id
              ? "ring-2 ring-primary border-primary"
              : "border-gray-200 dark:border-gray-700"
          }`}
          onClick={() => handleTemplateSelection(template.id)}
        >
          <div className="aspect-[3/4]">
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://i.imgur.com/placeholder.png";
              }}
            />
          </div>
          <div className="p-2 text-center text-sm font-medium dark:text-white">
            {template.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceTemplates;
