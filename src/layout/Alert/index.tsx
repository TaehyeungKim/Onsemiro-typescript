import { OverlayClose } from "@/components/global/type";
import { NoUserExistsAlertLayoutProps } from "./type";
import { MainCustomButton } from "@/components/CustomButton";
import { FloatAndShrinkOverlay } from "@/components/UIEffect/Floating";

function AlertFrame({ children }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="min-w-main-frame bg-background px-1 box-border  shadow-md rounded-lg flex flex-col justify-center items-center p-4">
      {children}
    </div>
  );
}

function NoUserExistsAlertLayout({ close }: NoUserExistsAlertLayoutProps) {
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

export function FloatingNoUserExistsAlertLayout({ close }: OverlayClose) {
  return (
    <FloatAndShrinkOverlay Child={NoUserExistsAlertLayout} close={close} />
  );
}
