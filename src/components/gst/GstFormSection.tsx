
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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

interface GstFormSectionProps {
  form: any;
  fields: Array<{
    name: string;
    label: string;
    type: 'select' | 'input' | 'checkbox';
    options?: Array<{ value: string; label: string }>;
  }>;
}

const GstFormSection: React.FC<GstFormSectionProps> = ({ form, fields }) => {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        if (field.type === 'checkbox') {
          return (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <Checkbox
                      checked={formField.value}
                      onCheckedChange={formField.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{field.label}</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          );
        }

        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === 'select' ? (
                    <Select
                      onValueChange={formField.onChange}
                      defaultValue={formField.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {field.options?.map(option => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      {...formField}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="w-full"
                    />
                  )}
                </FormControl>
              </FormItem>
            )}
          />
        );
      })}
    </div>
  );
};

export default GstFormSection;
