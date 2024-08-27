import { CustomTextInput } from "@/components/CustomInput";
import { SignUpContentSection } from "./base";

import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { howToKakao } from "@/assets/export";
import { useEffect } from "react";

export default function KakaoAuth() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  return (
    <SignUpContentSection className="mt-6">
      <h3 className="text-xl">카카오톡 아이디를 입력해주세요.</h3>
      <h5 className="mt-6 pl-1">
        카카오톡 아이디는 양측 모두
        <br />
        매칭에 동의했을 때 외에는 절대 공개되지 않아요
      </h5>
      <div className="relative h-8 flex items-center mt-6 px-3">
        <CustomTextInput
          id="profile_kakao"
          placeholder={"카카오톡 아이디 입력하기"}
          onChange={(e) =>
            setSignUpData({ ...signUpData, kakao_id: e.target.value })
          }
          defaultValue={signUpData.kakao_id ?? null}
        />
      </div>
      <figure className="w-3/4 m-auto mt-20">
        <img src={howToKakao} className="w-full"></img>
      </figure>
    </SignUpContentSection>
  );
}
