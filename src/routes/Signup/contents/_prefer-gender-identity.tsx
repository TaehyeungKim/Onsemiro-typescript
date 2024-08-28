import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { SignUpContentSection } from "./_base";
import { SelectionRadioGrid } from "@/components/CustomInput";
import { GenderIdentity } from "@/assets/const";

export default function PreferGenderIdentity() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  return (
    <>
      <SignUpContentSection>
        <h5>
          당신이 온새미로에서 만나고 싶은 이상형의
          <br />
          성정체성은 무엇인가요?
        </h5>
      </SignUpContentSection>
      <SignUpContentSection>
        <SelectionRadioGrid
          collection={GenderIdentity}
          name={"gender_wanted"}
          setter={(gender_wanted) =>
            setSignUpData({ ...signUpData, gender_wanted })
          }
          defaultV={signUpData.gender_wanted}
        ></SelectionRadioGrid>
      </SignUpContentSection>
    </>
  );
}
