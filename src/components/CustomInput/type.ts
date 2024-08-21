import { ComponentPropsWithoutRef } from "react";

export interface CustomTextInputProps
  extends ComponentPropsWithoutRef<"input"> {
  placeholder: string;
  id: string;
  label?: string;
}
