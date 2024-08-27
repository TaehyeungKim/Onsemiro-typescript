import { MBTISettingSection, CharacterSettingSection } from "./shared";
import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { SectionTitle, SignUpContentSection } from "./_base";
import { DEFAULT_CHARACTER_VALUE, DEFAULT_MBTI_VALUE } from "@/assets/const";
import { useEffect } from "react";

export default function Character() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  useEffect(() => {
    let stored = { ...signUpData };

    if (!stored.mbti)
      stored = {
        ...stored,
        mbti: `${DEFAULT_MBTI_VALUE.first}${DEFAULT_MBTI_VALUE.second}${DEFAULT_MBTI_VALUE.third}${DEFAULT_MBTI_VALUE.fourth}`,
      };
    if (!stored.character)
      stored = { ...stored, character: DEFAULT_CHARACTER_VALUE };

    setSignUpData(stored);
  }, []);

  return (
    <>
      <SignUpContentSection>
        <h3>당신의 MBTI와 성격을 알려주세요.</h3>
      </SignUpContentSection>
      <SignUpContentSection>
        <SectionTitle>MBTI</SectionTitle>
        <div className="mt-8">
          <MBTISettingSection
            mbti={
              signUpData.mbti ||
              `${DEFAULT_MBTI_VALUE.first}${DEFAULT_MBTI_VALUE.second}${DEFAULT_MBTI_VALUE.third}${DEFAULT_MBTI_VALUE.fourth}`
            }
            setter={(mbti) => {
              setSignUpData({ ...signUpData, mbti });
            }}
          />
        </div>
      </SignUpContentSection>
      <SignUpContentSection>
        <SectionTitle>성격</SectionTitle>
        <CharacterSettingSection
          character={signUpData.character || DEFAULT_CHARACTER_VALUE}
          setter={(character) => {
            setSignUpData({ ...signUpData, character });
          }}
        ></CharacterSettingSection>
      </SignUpContentSection>
    </>
  );
}
