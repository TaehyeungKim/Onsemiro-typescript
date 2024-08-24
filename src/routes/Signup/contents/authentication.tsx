import { useState } from "react";

import { SignUpContentSection, SectionTitle } from "./base";
import Icon from "@/components/Icon";
import { CheckBL, Search } from "@/assets/buttons/export";
import { CustomTextInput } from "@/components/CustomInput";
import { MainCustomButton } from "@/components/CustomButton";
import { signUp, requestSchoolVerifyCode } from "@/api/api";
import { useRecoilState } from "recoil";
import { SignUpClientStoreData } from "../type";
import { signUpState } from "@/state/state";
import { UnivSearch } from "@/components/Overlay";

export default function AuthenticateSelf() {
  //input state manage
  const [nameInput, setNameInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [authSchoolInput, setAuthSchoolInput] = useState<{
    school_name: string;
    school_email: string;
  }>({
    school_name: "",
    school_email: "",
  });

  //signup data manage
  const [signUpData, setSignUpData] =
    useRecoilState<SignUpClientStoreData>(signUpState);

  const [selfReady, setSelfReady] = useState<boolean>(false);
  const [schoolReady, setSchoolReady] = useState<boolean>(false);

  const [univSearchVisible, setUnivSearchVisible] = useState<boolean>(false);

  return (
    <>
      <SignUpContentSection className="mt-3">
        <h3>먼저, 전화 번호 인증과 학교 인증이 필요해요!</h3>
        <h5 className="flex items-center mt-2">
          <Icon tag="div" src={CheckBL} className="w-3" />
          <div className="px-2 text-xs">
            이 서비스는 신원이 확인된 사용자만 이용할 수 있어요.
          </div>
        </h5>
      </SignUpContentSection>
      <SignUpContentSection className="mt-3">
        <SectionTitle>번호 인증</SectionTitle>
        <div className="mt-2">
          <div className="mb-2">
            <CustomTextInput
              placeholder={"이름을 입력하세요."}
              id={"auth_name"}
              label={"이름"}
              onChange={(e) => setNameInput(e.target.value)}
              value={nameInput}
            />
          </div>
          <div className="mb-2 flex">
            <CustomTextInput
              id="auth_phone"
              placeholder={"전화번호"}
              onChange={(e) => setPhoneInput(e.target.value)}
              value={phoneInput}
            />
            <MainCustomButton
              className={`h-full py-0 ml-6 flex items-center ${
                selfReady ? "!bg-dark" : ""
              }`}
              onClick={() =>
                signUp({ phone_num: phoneInput }).then((res) => {
                  setSelfReady(res);
                  setSignUpData({ ...signUpData, phoneVerification: true });
                })
              }
            >
              인증
            </MainCustomButton>
          </div>
          <div className="relative h-8 flex items-center w-full">
            {signUpData.phoneVerification && (
              <h4 className="text-center text-green-500 text-sm">
                인증이 완료되었습니다.
              </h4>
            )}
          </div>
        </div>
      </SignUpContentSection>
      <SignUpContentSection className="mt-20">
        <SectionTitle>학교인증</SectionTitle>
        <div className="mt-2 flex flex-col gap-2">
          <div
            className="relative flex items-center"
            onClick={() => !schoolReady && setUnivSearchVisible(true)}
          >
            <CustomTextInput
              id="auth_school_search"
              placeholder={"학교를 검색해주세요."}
              onChange={(e) =>
                setAuthSchoolInput({
                  ...authSchoolInput,
                  school_name: e.target.value,
                })
              }
              readOnly
              value={signUpData.univ || authSchoolInput.school_name}
            />
            <Icon
              src={Search}
              tag="button"
              className="h-full absolute right-1"
            />
          </div>
          <div className="flex items-center">
            <CustomTextInput
              id="auth_schoolEmail"
              placeholder={"학교 이메일"}
              onChange={(e) =>
                setAuthSchoolInput({
                  ...authSchoolInput,
                  school_email: e.target.value,
                })
              }
              readOnly={schoolReady}
              value={signUpData.email || authSchoolInput.school_email}
            />
            <MainCustomButton
              className={`h-full py-0 ml-6 flex items-center ${
                schoolReady ? "!bg-input-darker" : ""
              }`}
              onClick={() => {
                !schoolReady &&
                  requestSchoolVerifyCode({
                    email: authSchoolInput.school_email,
                    univ: authSchoolInput.school_name,
                  }).then((res) => {
                    setSignUpData({
                      ...signUpData,
                      univ: authSchoolInput.school_name,
                      email: authSchoolInput.school_email,
                      schoolVerification: true,
                    });
                    setSchoolReady(true);
                  });
              }}
            >
              인증
            </MainCustomButton>
          </div>
          <div>
            <CustomTextInput
              id="auth_school_verify_code"
              placeholder={"인증번호 입력하기"}
              onChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  verifyCode: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </SignUpContentSection>
      {univSearchVisible && (
        <UnivSearch
          close={() => setUnivSearchVisible(false)}
          select={(univ) => {
            setAuthSchoolInput({ ...authSchoolInput, school_name: univ });
            setUnivSearchVisible(false);
          }}
          defaultValue={authSchoolInput.school_name}
        />
      )}
    </>
  );
}
