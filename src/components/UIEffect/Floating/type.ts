import { OverlayStandardLayoutProps } from "@/layout/base";

export interface RecursiveFloatingContainerProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children: JSX.Element;
  floating: string;
  initial?: "visible" | "hidden" | "inherit";
  floatMode?: "animationend" | "animationstart";
  listener?: () => void;
}

export interface FloatElementProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children: JSX.Element;
  condition: unknown;
}

export interface FloatAndShrinkElementProps extends FloatElementProps {}

export type FloatAndShrinkOverlayProps<T extends OverlayStandardLayoutProps> =
  T &
    React.ComponentPropsWithoutRef<"div"> & {
      Layout: ({ close, children, ...props }: T) => JSX.Element;
    };
