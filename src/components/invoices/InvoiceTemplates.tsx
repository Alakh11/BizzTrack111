
import React, { useEffect } from "react";

interface InvoiceTemplatesProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  templates: Array<{
    id: string;
    name: string;
    preview: string;
  }>;
}

const InvoiceTemplates: React.FC<InvoiceTemplatesProps> = ({
  selectedTemplate,
  setSelectedTemplate,
  templates
}) => {
  // Preload all template images on component mount
  useEffect(() => {
    templates.forEach(template => {
      const img = new Image();
      img.src = template.preview;
    });
  }, [templates]);

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
          <div className="aspect-[3/4] relative">
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                console.error(`Failed to load template: ${template.name}`);
                // Fallback on error
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
