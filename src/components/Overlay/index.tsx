import { OverlayClose } from "@/components/global/type";
import { FloatingNoUserExistsAlertLayout } from "@/layout/Alert";

export function NoUserExistsAlert({ close }: OverlayClose) {
  return <FloatingNoUserExistsAlertLayout close={close} />;
}
