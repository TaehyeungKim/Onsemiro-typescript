import { OverlayStandardLayoutProps } from "../base";

interface BaseAlertLayoutProps extends OverlayStandardLayoutProps {}

export interface NoUserExistsAlertLayoutProps extends BaseAlertLayoutProps {}

export interface ConfirmAlertLayoutProps extends BaseAlertLayoutProps {
  confirm: () => void;
}
