
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
import { Checkbox } from "@/components/ui/checkbox";
import { GstFormSectionProps } from "./GstFormSectionProps";

const GstFormSection = ({ form, fields }: GstFormSectionProps) => {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              {field.type === "select" && (
                <>
                  <Select
                    onValueChange={formField.onChange}
                    defaultValue={formField.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              {field.type === "input" && (
                <FormControl>
                  <Input {...formField} placeholder={`Enter ${field.label.toLowerCase()}`} />
                </FormControl>
              )}
              {field.type === "checkbox" && (
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={formField.value}
                      onCheckedChange={formField.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">{field.label}</FormLabel>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default GstFormSection;
