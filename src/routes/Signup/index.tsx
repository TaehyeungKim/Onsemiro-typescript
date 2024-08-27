import { useCallback, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { SignUpCancleAlert, VerifyErrorAlert } from "@/components/Overlay";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/Icon";
import { Back, Close } from "@/assets/buttons/export";
import SignUpPageContent from "./content";
import { FloatElement } from "@/components/UIEffect/Floating";
import { executeOnDataFulfilled } from "./utils";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { SignUpClientStoreData } from "./type";
import { signUpState } from "@/state/state";
import { MainCustomButton } from "@/components/CustomButton";
import { checkSchoolVerifyCode } from "@/api/api";

export default function SignUpPage() {
  const TOTAL_LEVEL_COUNT = 14;

  const navigate = useNavigate();
  const [curLevel, setCurLevel] = useState<number>(1);

  const signUpData = useRecoilValue<SignUpClientStoreData>(signUpState);

  const nextAction = useCallback(
    (data: SignUpClientStoreData) => {
      switch (curLevel) {
        case 0:
          return checkSchoolVerifyCode({ code: data.verifyCode })
            .then((res) => {
              setCurLevel(curLevel + 1);
            })
            .catch(() => setCodeInvalidAlertVisible(true));
        default:
          return setCurLevel(curLevel + 1);
      }
    },
    [curLevel]
  );

  //UI
  const [isFloatingEnd, setIsFloatingEnd] = useState<boolean>(false);
  const [nextVisible, setNextVisible] = useState<boolean>(false);
  const [stopAlertVisible, setStopAlertVisible] = useState<boolean>(false);
  const [codeInvalidAlertVisible, setCodeInvalidAlertVisible] =
    useState<boolean>(false);

  useEffect(() => {
    return () => setIsFloatingEnd(false);
  }, [curLevel]);

  useEffect(() => {
    executeOnDataFulfilled(curLevel, signUpData, () => {
      if (isFloatingEnd) {
        setNextVisible(true);
      }
    });
    return () => {
      setNextVisible(false);
    };
  }, [signUpData, isFloatingEnd]);

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
      {codeInvalidAlertVisible && (
        <VerifyErrorAlert
          close={() => setCodeInvalidAlertVisible(false)}
        ></VerifyErrorAlert>
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
      <SignUpPageContent
        level={curLevel}
        floatListener={() => setIsFloatingEnd(true)}
      />
      <FloatElement condition={nextVisible}>
        <SignUpNextButton
          level={curLevel}
          next={() => nextAction(signUpData)}
        />
      </FloatElement>
    </div>
  );
}

interface SignUpNextButtonProps {
  level: number;
  next: () => void;
}

function SignUpNextButton({ level, next }: SignUpNextButtonProps) {
  const buttonActionPerLevel = useCallback(() => {
    switch (level) {
      case 0:
        return { message: "인증 완료하기" };
      default:
        return { message: "다음으로" };
    }
  }, [level]);

  return (
    <div className="flex my-auto w-11/12 mx-auto gap-x-10 px-6">
      {/* {level === 13 ? (
            <MainCustomButton
              className="!bg-background !text-black !mx-0 grow"
              onClick={() => {
                setSignUpData({ ...signUpData, preference: undefined });
              }}
            >
              SKIP
            </MainCustomButton>
          ) : null} */}

      <MainCustomButton
        onClick={next}
        className={level === 13 ? "!mx-0 grow" : ""}
      >
        {buttonActionPerLevel().message}
      </MainCustomButton>
    </div>
  );
}
