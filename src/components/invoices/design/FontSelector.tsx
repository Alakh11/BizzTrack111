
import React from "react";
import { useInvoiceDesign } from "@/hooks/useInvoiceDesign";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
  const { fontFamilies } = useInvoiceDesign();

  return (
    <div className="space-y-2">
      <Label htmlFor="font-select">Font Family</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="font-select" className="w-full dark:bg-gray-800 dark:text-white">
          <SelectValue placeholder="Select Font" />
        </SelectTrigger>
        <SelectContent>
          {fontFamilies.map((font) => (
            <SelectItem
              key={font.id}
              value={font.id}
              className={font.class}
            >
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="mt-2 p-3 border rounded-md dark:bg-gray-800 dark:text-white bg-gray-50">
        <p className={`text-sm ${fontFamilies.find(f => f.id === value)?.class || ''}`}>
          Sample text in {fontFamilies.find(f => f.id === value)?.name || 'selected font'}
        </p>
      </div>
    </div>
  );
};

export default FontSelector;
