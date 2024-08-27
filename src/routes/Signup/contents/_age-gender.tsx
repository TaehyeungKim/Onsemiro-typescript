import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { GenderIdentity } from "@/assets/const";
import { SignUpContentSection, SectionTitle } from "./_base";
import { SelectionRadioGrid, RangeBar } from "@/components/CustomInput";
import { useEffect } from "react";

export default function AgeAndGender() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  const DEFAULT_AGE = 25;

  useEffect(() => {
    if (!signUpData.age) setSignUpData({ ...signUpData, age: DEFAULT_AGE });
  }, []);

  return (
    <>
      <SignUpContentSection>
        <h3>당신의 성 정체성과 나이를 알려주세요.</h3>
      </SignUpContentSection>
      <SignUpContentSection>
        <SectionTitle>성 정체성</SectionTitle>
        <SelectionRadioGrid
          collection={GenderIdentity}
          name="gender"
          setter={(gender) => setSignUpData({ ...signUpData, gender })}
          defaultV={signUpData.gender ?? ""}
        />
      </SignUpContentSection>
      <SignUpContentSection>
        <SectionTitle>나이</SectionTitle>
        <div className="mt-14">
          <RangeBar
            max={30}
            min={20}
            defaultValue={signUpData.age || DEFAULT_AGE}
            step={1}
            setter={(age) =>
              setSignUpData({ ...signUpData, age: parseInt(age) })
            }
            captions={[20, 25, 30]}
          />
        </div>
        <h5 className="text-center font-semibold my-8">
          {signUpData.age || DEFAULT_AGE}세
        </h5>
      </SignUpContentSection>
    </>
  );
}
