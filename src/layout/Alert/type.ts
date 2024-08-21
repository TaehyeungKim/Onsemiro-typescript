import { OverlayClose } from "@/components/global/type";

export interface BaseAlertLayoutProps
  extends React.ComponentPropsWithoutRef<"div"> {
  close: OverlayClose;
  children?: JSX.Element;
}

export interface NoUserExistsAlertLayoutProps extends BaseAlertLayoutProps {}

export interface ConfirmAlertLayoutProps extends BaseAlertLayoutProps {
  confirm: () => void;
}
