import Icon from "@/components/Icon";
import {
  NoUserExistsAlertLayoutProps,
  ConfirmAlertLayoutProps,
  VerifyErrorALertLayoutProps,
} from "./type";
import { MainCustomButton } from "@/components/CustomButton";
import { Lock } from "@/assets/export";

function AlertFrame({ children }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="min-w-main-frame bg-background px-1 box-border  shadow-md rounded-lg flex flex-col justify-center items-center p-4">
      {children}
    </div>
  );
}

export function ConfirmAlertLayout({
  children,
  confirm,
  close,
}: ConfirmAlertLayoutProps) {
  return (
    <AlertFrame>
      {children}
      <div className="flex justify-center mt-6 gap-5">
        <MainCustomButton onClick={confirm}>확인</MainCustomButton>
        <MainCustomButton className="bg-white !text-black" onClick={close}>
          취소
        </MainCustomButton>
      </div>
    </AlertFrame>
  );
}

export function NoUserExistsAlertLayout({
  close,
  ...props
}: NoUserExistsAlertLayoutProps) {
  return (
    <AlertFrame>
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="font-bold text-center leading-8">
            해당 번호로 가입된 계정이 없습니다.
            <br />
            회원가입하고 온새미로를 이용해보세요!
          </h4>
        </div>
        <MainCustomButton onClick={close}>
          설문하고 회원가입하기
        </MainCustomButton>
      </div>
    </AlertFrame>
  );
}

export function VerifyErrorAlertLayout({ close }: VerifyErrorALertLayoutProps) {
  return (
    <AlertFrame>
      <MainCustomButton onClick={close} className="bg-sub">
        <div className="flex justify-center items-center">
          <Icon src={Lock} tag="div" className="w-4 mr-3" />
          <span className="h-6">인증번호가 다릅니다.</span>
        </div>
      </MainCustomButton>
    </AlertFrame>
  );
}
