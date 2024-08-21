import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { SignUpCancleAlert } from "@/components/Overlay";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/Icon";
import { Back, Close } from "@/assets/buttons/export";

export default function SignUpPage() {
  const TOTAL_LEVEL_COUNT = 14;

  const navigate = useNavigate();
  const [curLevel, setCurLevel] = useState<number>(0);

  const [stopAlertVisible, setStopAlertVisible] = useState<boolean>(false);

  return (
    <div className="box-border pb-11 flex flex-col min-h-screen">
      {stopAlertVisible && (
        <SignUpCancleAlert
          close={() => setStopAlertVisible(false)}
          confirm={() => navigate("/signin")}
        >
          <>
            <h4 className="font-bold">
              여기서 멈추시면 온새미로 서비스를 이용할 수 없어요.
            </h4>
            <h4 className="mt-2 font-bold">정말 회원가입을 멈추시겠습니까?</h4>
          </>
        </SignUpCancleAlert>
      )}
      <header className="p-2">
        <nav className="flex flex-row justify-between mb-3">
          {curLevel > 0 ? (
            <Icon
              tag="button"
              src={Back}
              className={`w-3 block`}
              onClick={() => curLevel > 0 && setCurLevel(curLevel - 1)}
            />
          ) : null}

          <Icon
            tag="button"
            src={Close}
            className={`${curLevel === 0 && "ml-auto"} w-4 block`}
            onClick={() => setStopAlertVisible(true)}
          />
        </nav>
        <ProgressBar total={TOTAL_LEVEL_COUNT} cur={curLevel + 1} />
        <h5 className="text-right text-xs mt-2">
          {curLevel + 1}/{TOTAL_LEVEL_COUNT}
        </h5>
      </header>
    </div>
  );
}
