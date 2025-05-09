import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransportFormSectionProps {
  form: any;
  title: string;
  fields: {
    name: string;
    label: string;
    type: "select" | "input" | "date";
    options?: { value: string; label: string }[];
    buttonText?: string;
    onButtonClick?: () => void;
  }[];
  className?: string;
}

const TransportFormSection: React.FC<TransportFormSectionProps> = ({
  form,
  title,
  fields,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h4 className="font-medium">{title}</h4>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "select" && field.options ? (
                    <Select
                      onValueChange={formField.onChange}
                      value={formField.value || ""}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`Select ${field.label.toLowerCase()}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "input" ? (
                    <Input {...formField} />
                  ) : (
                    <Input type="date" {...formField} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default TransportFormSection;
