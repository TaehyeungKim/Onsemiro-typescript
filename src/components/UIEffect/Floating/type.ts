import { BaseAlertLayoutProps } from "@/layout/Alert/type";

export interface RecursiveFloatingContainerProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children: JSX.Element;
  floating: string;
  initial?: "visible" | "hidden" | "inherit";
}

export interface FloatAndShrinkElementProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children: JSX.Element;
  condition: unknown;
}

export type FloatAndShrinkOverlayProps<T extends BaseAlertLayoutProps> = T &
  React.ComponentPropsWithoutRef<"div"> & {
    Child: ({ close, children, ...props }: T) => JSX.Element;
  };
