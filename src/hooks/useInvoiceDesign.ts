
import { useState } from "react";

export const useInvoiceDesign = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedFont, setSelectedFont] = useState("inter");
  const [selectedPaperSize, setSelectedPaperSize] = useState("a4");
  const [businessLogo, setBusinessLogo] = useState("");

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
    setBusinessLogo
  };
};
