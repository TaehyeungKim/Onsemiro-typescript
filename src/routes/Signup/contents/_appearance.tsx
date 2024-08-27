import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { SectionTitle, SignUpContentSection } from "./_base";
import { ExtendedRangeBar, SelectionRadioGrid } from "@/components/CustomInput";
import { useLayoutEffect } from "react";
import {
  WeightCollection,
  AppearanceCollection,
  EyelidCollection,
} from "@/assets/const";

export default function Appearance() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  const [MIN, MAX] = [145, 185];

  useLayoutEffect(() => {
    if (!signUpData.height) setSignUpData({ ...signUpData, height: MIN });
  }, []);

  return (
    <>
      <SignUpContentSection>
        <h3>당신의 키와 생김새, 체형을 알려주세요.</h3>
      </SignUpContentSection>
      <SignUpContentSection>
        <SectionTitle>키</SectionTitle>
        <ExtendedRangeBar
          max={MAX}
          min={MIN}
          defaultValue={signUpData.height || MIN}
          step={5}
          setter={(height) =>
            setSignUpData({ ...signUpData, height: parseInt(height) })
          }
          captions={[150, 155, 160, 165, 170, 175, 180, 185]}
        />
        <h5 className="text-center font-semibold my-8 ">
          {signUpData.height === MIN ? (
            "150 미만"
          ) : signUpData.height === MAX ? (
            "185 초과"
          ) : (
            <>
              <span className="inline-block mr-[0.5px]">
                {signUpData.height}이상
              </span>{" "}
              <span className="inline-block ml-[0.5px]">
                {signUpData.height + 5}미만
              </span>
            </>
          )}
        </h5>
      </SignUpContentSection>
      <SignUpContentSection>
        <SectionTitle>체형</SectionTitle>
        <SelectionRadioGrid
          collection={WeightCollection}
          name="weight"
          setter={(weight) => setSignUpData({ ...signUpData, weight })}
          defaultV={signUpData.weight}
        />
      </SignUpContentSection>
      <SignUpContentSection>
        <SectionTitle>생김새</SectionTitle>
        <SelectionRadioGrid
          collection={AppearanceCollection}
          name="appearance"
          setter={(appearance) => setSignUpData({ ...signUpData, appearance })}
          defaultV={signUpData.appearance}
        />
      </SignUpContentSection>
      <SignUpContentSection className="mb-7">
        <SectionTitle>쌍커풀 유무</SectionTitle>
        <SelectionRadioGrid
          collection={EyelidCollection}
          name="eyelid"
          setter={(eyelid) => setSignUpData({ ...signUpData, eyelid })}
          defaultV={signUpData.eyelid}
        ></SelectionRadioGrid>
      </SignUpContentSection>
    </>
  );
}
