import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { SignUpContentSection, SectionTitle } from "./_base";
import { MeetFrequency, SelectRegions } from "./shared";
import { CITYSET } from "@/assets/const";
import { useEffect } from "react";

export default function FrequencyAndLocation() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  useEffect(() => {
    if (!signUpData.meeting_frequency)
      setSignUpData({ ...signUpData, meeting_frequency: 1 });
  }, []);

  return (
    <>
      <SignUpContentSection>
        <h5>원하는 만남 주기와 거주 지역을 알려주세요.</h5>
      </SignUpContentSection>
      <SignUpContentSection>
        <div>
          <SectionTitle>일주일에 원하는 만남 횟수</SectionTitle>
          <div className="mt-14">
            <MeetFrequency
              meetNum={signUpData.meeting_frequency || 1}
              setter={(num) =>
                setSignUpData({ ...signUpData, meeting_frequency: num })
              }
            />
          </div>
        </div>
      </SignUpContentSection>
      <SignUpContentSection>
        <SectionTitle>거주 지역</SectionTitle>
        <section className="mt-5">
          <SelectRegions
            set={CITYSET}
            setter={{
              city: (city) =>
                setSignUpData({ ...signUpData, city, subRegion: "" }),
              sub: (sub) => setSignUpData({ ...signUpData, subRegion: sub }),
            }}
            selected={{
              city: signUpData.city,
              sub: signUpData.subRegion,
            }}
          />
        </section>
      </SignUpContentSection>
    </>
  );
}
