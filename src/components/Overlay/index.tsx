import { NoUserExistsAlertLayout, ConfirmAlertLayout } from "@/layout/Alert";

import {
  NoUserExistsAlertLayoutProps,
  ConfirmAlertLayoutProps,
} from "@/layout/Alert/type";

import { FloatAndShrinkOverlay } from "../UIEffect/Floating";

export function NoUserExistsAlert({ close }: NoUserExistsAlertLayoutProps) {
  return (
    <FloatAndShrinkOverlay<NoUserExistsAlertLayoutProps>
      Child={NoUserExistsAlertLayout}
      close={close}
    />
  );
}

export function SignUpCancleAlert({
  children,
  close,
  ...props
}: ConfirmAlertLayoutProps) {
  return (
    <FloatAndShrinkOverlay<ConfirmAlertLayoutProps>
      Child={ConfirmAlertLayout}
      close={close}
      {...props}
    >
      {children}
    </FloatAndShrinkOverlay>
  );
}
