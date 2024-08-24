import { OverlayStandardLayoutProps } from "../base";

type UnivElement = string;
type UnivSelect = (univ: string) => void;

export interface UnivSearchInputSectionProps {
  setter: (input: string) => void;
  defaultValue: string;
}

export interface UnivSearchResultsSectionProps {
  select: UnivSelect;
  results: UnivElement[] | null;
}

export interface UnivSearchOverlayLayoutProps
  extends OverlayStandardLayoutProps {
  select: UnivSelect;
  defaultValue: string;
}
