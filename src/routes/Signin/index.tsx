import { CustomTextInput } from "@/components/CustomInput";
import { MainCustomButton } from "@/components/CustomButton";
import { signIn } from "@/api/api";
import { getCookie } from "@/utils/cookie";
import { useState, useRef } from "react";
import { NoUserExistsAlert } from "@/components/Overlay/index";
import { FloatAndShrinkElement } from "@/components/UIEffect/Floating";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [verificationCodeInput, setVerificationCodeInput] =
    useState<string>("");
  const [verifyInputVisible, setVerifyInputVisible] = useState<boolean>(false);
  const [noUserExistsAlertVisible, setNoUserExistsAlertVisible] =
    useState<boolean>(false);

  return (
    <>
      {noUserExistsAlertVisible && (
        <NoUserExistsAlert
          close={() => navigate("/signup")}
        ></NoUserExistsAlert>
      )}
      <main className="flex flex-col justify-center min-h-screen box-border px-5">
        <h2 className="text-4xl font-bold leading-snug mb-9">
          나에게 온 쪽지를
          <br /> 보러 가볼까요?
        </h2>
        <div className="flex mb-4">
          <CustomTextInput
            id="signin_phone"
            placeholder={"전화번호"}
            onChange={(e) => setPhoneInput(e.target.value)}
          />
          <div className="ml-6">
            <MainCustomButton
              onClick={() => {
                if (verifyInputVisible) return;
                signIn({ phone_num: phoneInput })
                  .then((res) => res && setVerifyInputVisible(true))
                  .catch((reason) => {
                    console.log(reason);
                    if (reason.response.status === 400)
                      setNoUserExistsAlertVisible(true);
                  });
              }}
              className={`${
                verifyInputVisible ? "!bg-input-darker !text-white" : null
              } `}
            >
              인증
            </MainCustomButton>
          </div>
        </div>
        {getCookie("access_token") && verifyInputVisible ? (
          <div className={`block afterLogin`}>
            <div className={`flex  mb-3 verificationAppear`}>
              <CustomTextInput
                id="phone_verify"
                placeholder={"인증번호 입력하기"}
                onChange={(e) => setVerificationCodeInput(e.target.value)}
              />
            </div>
            <FloatAndShrinkElement condition={verificationCodeInput}>
              <MainCustomButton
                className={"!w-full"}
                onClick={() => {
                  getCookie("access_token") && navigate("/main");
                }}
              >
                로그인하기
              </MainCustomButton>
            </FloatAndShrinkElement>
          </div>
        ) : null}
        <h6 className="mt-3">* 전화번호는 소개에 노출되지 않습니다.</h6>
        <div className="mt-20 w-full flex-col flex items-center gap-3">
          <h5 className="font-bold">아직 계정이 없다면?</h5>
          <MainCustomButton onClick={() => navigate("/signup")}>
            설문하고 회원가입하기
          </MainCustomButton>
        </div>
      </main>
    </>
  );
}
