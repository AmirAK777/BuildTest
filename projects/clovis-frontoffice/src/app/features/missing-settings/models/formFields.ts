export interface FormField {
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

export interface FormConfig {
  fields: FormField[];
}
