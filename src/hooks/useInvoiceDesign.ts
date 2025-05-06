
import { useState } from "react";

// Template images with valid URLs
const templateImages = {
  standard: "https://i.imgur.com/CtbuDF6.png",
  professional: "https://i.imgur.com/l2O3M5j.png",
  modern: "https://i.imgur.com/DFg6QiK.png",
  classic: "https://i.imgur.com/CtbuDF6.png",
  minimal: "https://i.imgur.com/yH8vXNk.png",
  elegant: "https://i.imgur.com/BpjcRZK.png",
  corporate: "https://i.imgur.com/ZdT8nkL.png",
  simple: "https://i.imgur.com/sO17jcA.png",
};

// Dummy template data with actual image URLs
const dummyTemplates = [
  { id: "standard", name: "Standard", preview: templateImages.standard },
  { id: "professional", name: "Professional", preview: templateImages.professional },
  { id: "modern", name: "Modern", preview: templateImages.modern },
  { id: "minimal", name: "Minimal", preview: templateImages.minimal },
  { id: "classic", name: "Classic", preview: templateImages.classic },
  { id: "elegant", name: "Elegant", preview: templateImages.elegant },
  { id: "corporate", name: "Corporate", preview: templateImages.corporate },
  { id: "simple", name: "Simple", preview: templateImages.simple }
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
    templates,
    templateImages
  };
};
