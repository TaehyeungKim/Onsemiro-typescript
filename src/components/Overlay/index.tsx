import {
  NoUserExistsAlertLayout,
  ConfirmAlertLayout,
  VerifyErrorAlertLayout,
} from "@/layout/Alert";

import {
  NoUserExistsAlertLayoutProps,
  ConfirmAlertLayoutProps,
  VerifyErrorALertLayoutProps,
} from "@/layout/Alert/type";

import { UnivSearchOverlayLayout } from "@/layout/UnivSearch";
import { UnivSearchOverlayLayoutProps } from "@/layout/UnivSearch/type";

import { FloatAndShrinkOverlay } from "../UIEffect/Floating";

export function NoUserExistsAlert({ close }: NoUserExistsAlertLayoutProps) {
  return (
    <FloatAndShrinkOverlay<NoUserExistsAlertLayoutProps>
      Layout={NoUserExistsAlertLayout}
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
      Layout={ConfirmAlertLayout}
      close={close}
      {...props}
    >
      {children}
    </FloatAndShrinkOverlay>
  );
}

export function UnivSearch({ ...props }: UnivSearchOverlayLayoutProps) {
  return (
    <FloatAndShrinkOverlay<UnivSearchOverlayLayoutProps>
      Layout={UnivSearchOverlayLayout}
      {...props}
    />
  );
}

export function VerifyErrorAlert({ close }: VerifyErrorALertLayoutProps) {
  return (
    <FloatAndShrinkOverlay<VerifyErrorALertLayoutProps>
      Layout={VerifyErrorAlertLayout}
      close={close}
    />
  );
}
