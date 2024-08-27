import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { SectionTitle, SignUpContentSection } from "./_base";
import { SelectionRadioGrid } from "@/components/CustomInput";
import { Bdsm, GenderPreference } from "@/assets/const";

export default function Sexual() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  return (
    <>
      <SignUpContentSection>
        <h3>성적 지향 및 성향을 알려주세요.</h3>
      </SignUpContentSection>
      <SignUpContentSection>
        <SectionTitle>성적 지향</SectionTitle>
        <SelectionRadioGrid
          collection={GenderPreference}
          name="gender_preference"
          setter={(gender_preference) =>
            setSignUpData({ ...signUpData, gender_preference })
          }
          defaultV={signUpData.gender_preference}
        />
      </SignUpContentSection>
      <SignUpContentSection className="mb-5">
        <SectionTitle>성적 성향</SectionTitle>
        <SelectionRadioGrid
          collection={Bdsm}
          name="bdsm"
          setter={(bdsm) => setSignUpData({ ...signUpData, bdsm })}
          defaultV={signUpData.bdsm}
        />
      </SignUpContentSection>
    </>
  );
}
