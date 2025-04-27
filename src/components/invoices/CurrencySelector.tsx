
import React from "react";
import {
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  return (
    <FormItem>
      <FormLabel>Currency</FormLabel>
      <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="inr">Indian Rupee (INR, ₹)</SelectItem>
          <SelectItem value="usd">US Dollar (USD, $)</SelectItem>
          <SelectItem value="eur">Euro (EUR, €)</SelectItem>
          <SelectItem value="gbp">British Pound (GBP, £)</SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  );
};

export default CurrencySelector;
