export interface GstFormSectionProps {
  form: any;
  fields: Array<{
    name: string;
    label: string;
    type: "select" | "input" | "checkbox";
    options?: Array<{ value: string; label: string }>;
  }>;
}
