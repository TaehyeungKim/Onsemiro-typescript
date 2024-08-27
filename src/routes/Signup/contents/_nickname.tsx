import { CustomTextInput } from "@/components/CustomInput";
import { SignUpContentSection } from "./_base";

import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";

export default function NickNameInput() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  return (
    <>
      <SignUpContentSection>
        <h5>온새미로에서 사용할 닉네임을 입력해주세요.</h5>
      </SignUpContentSection>
      <SignUpContentSection>
        <CustomTextInput
          id="nickname"
          placeholder="닉네임 입력하기"
          onChange={(e) =>
            setSignUpData({
              ...signUpData,
              nickname: e.target.value,
            })
          }
          defaultValue={signUpData.nickname ?? null}
        />
      </SignUpContentSection>
    </>
  );
}
