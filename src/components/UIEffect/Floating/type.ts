import { OverlayClose } from "@/components/global/type";

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

type FloatAndShrinkOverlayChild = React.ComponentPropsWithoutRef<"div"> &
  OverlayClose;

export interface FloatAndShrinkOverlayProps
  extends React.ComponentPropsWithoutRef<"div">,
    OverlayClose {
  Child: ({
    close,
    children,
    ...props
  }: FloatAndShrinkOverlayChild) => JSX.Element;
}
