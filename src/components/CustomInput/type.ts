import { ComponentPropsWithoutRef } from "react";

export interface CustomTextInputProps
  extends ComponentPropsWithoutRef<"input"> {
  placeholder: string;
  id: string;
  label?: string;
}

export type RadioCollection = {
  main: string;
  sub?: string;
};

export interface SelectionRadioGridProps {
  collection: RadioCollection[];
  name: string;
  setter: (value: string) => void;
  defaultV: string;
}

export interface RangeBarProps extends React.ComponentPropsWithoutRef<"input"> {
  setter: (value: string) => void;
  captions?: (string | number)[];
  options?: any;
  max: number;
  min: number;
  step: number;
  defaultValue: number;
}

export interface DoubleThumbRangeBarProps {
  min: number;
  max: number;
  step: number;
  captions: (string | number)[];
  defaultValue: {
    max: number;
    min: number;
  };
  setter: {
    setSmaller: (value: number) => void;
    setBigger: (value: number) => void;
  };
}
