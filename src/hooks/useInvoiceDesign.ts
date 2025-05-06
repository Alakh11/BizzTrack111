
import { useState } from "react";

// Dummy template data since external data is no longer available
const dummyTemplates = [
  { id: "standard", name: "Standard", preview: "/placeholder.svg" },
  { id: "professional", name: "Professional", preview: "/placeholder.svg" },
  { id: "modern", name: "Modern", preview: "/placeholder.svg" },
  { id: "minimal", name: "Minimal", preview: "/placeholder.svg" },
  { id: "classic", name: "Classic", preview: "/placeholder.svg" }
];

export const useInvoiceDesign = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedFont, setSelectedFont] = useState("inter");
  const [selectedPaperSize, setSelectedPaperSize] = useState("a4");
  const [businessLogo, setBusinessLogo] = useState("");
  
  // Add templates for local use
  const templates = dummyTemplates;

  return {
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
    templates
  };
};
