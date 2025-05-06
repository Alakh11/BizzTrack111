
import { useState } from "react";

// Template images with valid URLs for different invoice templates
const templateImages = {
  standard: "https://i.imgur.com/CtbuDF6.png",
  professional: "https://i.imgur.com/l2O3M5j.png",
  modern: "https://i.imgur.com/DFg6QiK.png",
  classic: "https://i.imgur.com/Z5a2g7R.png",
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

// Font families available for selection
const fontFamilies = [
  { id: "inter", name: "Inter", class: "font-sans" },
  { id: "playfair", name: "Playfair Display", class: "font-playfair" },
  { id: "montserrat", name: "Montserrat", class: "font-montserrat" },
  { id: "poppins", name: "Poppins", class: "font-poppins" },
  { id: "timesNewRoman", name: "Times New Roman", class: 'font-["Times_New_Roman"]' },
  { id: "calibri", name: "Calibri", class: 'font-["Calibri"]' },
  { id: "algerian", name: "Algerian", class: 'font-["Algerian"]' },
];

export const useInvoiceDesign = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedFont, setSelectedFont] = useState("inter");
  const [selectedPaperSize, setSelectedPaperSize] = useState("a4");
  const [businessLogo, setBusinessLogo] = useState("");
  
  // Add templates for local use with better preloading
  const templates = dummyTemplates;

  // Preload template images to avoid loading issues
  if (typeof window !== 'undefined') {
    templates.forEach(template => {
      const img = new Image();
      img.src = template.preview;
    });
  }

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
    templateImages,
    fontFamilies
  };
};
