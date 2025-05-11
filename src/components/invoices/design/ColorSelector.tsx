import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  onChange,
}) => {
  const colors = [
    { id: "blue", name: "Blue", class: "bg-blue-500" },
    { id: "red", name: "Red", class: "bg-red-500" },
    { id: "green", name: "Green", class: "bg-green-500" },
    { id: "purple", name: "Purple", class: "bg-purple-500" },
    { id: "orange", name: "Orange", class: "bg-orange-500" },
    { id: "pink", name: "Pink", class: "bg-pink-500" },
    { id: "indigo", name: "Indigo", class: "bg-indigo-500" },
    { id: "yellow", name: "Yellow", class: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-2">
      <Label>Color Theme</Label>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            type="button"
            className={cn(
              "w-8 h-8 rounded-full transition-all",
              color.class,
              selectedColor === color.id
                ? "ring-2 ring-offset-2 ring-primary scale-110"
                : "hover:scale-110",
            )}
            title={color.name}
            onClick={() => onChange(color.id)}
            aria-label={`Select ${color.name} theme`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
