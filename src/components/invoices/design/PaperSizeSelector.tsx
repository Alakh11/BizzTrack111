
import React from "react";

interface PaperSize {
  id: string;
  name: string;
  dimensions: string;
}

interface PaperSizeSelectorProps {
  selectedPaperSize: string;
  setSelectedPaperSize: (size: string) => void;
}

const PaperSizeSelector: React.FC<PaperSizeSelectorProps> = ({
  selectedPaperSize,
  setSelectedPaperSize,
}) => {
  const paperSizes: PaperSize[] = [
    { id: "a4", name: "A4", dimensions: "210 × 297 mm" },
    { id: "letter", name: "US Letter", dimensions: "215.9 × 279.4 mm" },
    { id: "legal", name: "US Legal", dimensions: "215.9 × 355.6 mm" },
    { id: "a3", name: "A3", dimensions: "297 × 420 mm" },
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium dark:text-gray-200">Paper Size</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {paperSizes.map((size) => (
          <div
            key={size.id}
            className={`border rounded-md p-3 text-center cursor-pointer hover:bg-muted transition-colors dark:hover:bg-gray-700 ${
              selectedPaperSize === size.id
                ? "border-primary bg-primary/10 dark:bg-primary/20"
                : "dark:border-gray-700"
            }`}
            onClick={() => setSelectedPaperSize(size.id)}
          >
            <p className="font-medium dark:text-gray-100">{size.name}</p>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              {size.dimensions}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaperSizeSelector;
