import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { interestValueSet } from "@/assets/const";
import { SignUpContentSection } from "./_base";
import { useState, useEffect } from "react";
import { InterestValueSet } from "@/assets/type";
import Icon from "@/components/Icon";
import { PointerBox } from "@/layout/PointerBox";

export default function Interest() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  const [interest, setInterest] = useState<InterestValueSet>(() => {
    return interestValueSet.filter((set) =>
      signUpData.hobby.some((hobby) => set.value === hobby)
    );
  });

  useEffect(() => {
    setSignUpData({ ...signUpData, hobby: interest.map((set) => set.value) });
  }, [interest]);

  return (
    <SignUpContentSection>
      <h5>
        요즘 당신이 빠진 관심사는 무엇인가요?
        <br />
        (복수 선택 가능)
      </h5>
      <div className="flex flex-wrap gap-x-3 gap-y-2 mt-4">
        {interestValueSet.map((set, i) => (
          <button key={i} className="overflow-hidden rounded-md">
            <input
              className="peer"
              hidden
              id={set.value}
              type="checkbox"
              name="interest"
              onChange={(e) => {
                if (e.target.checked) setInterest([...interest, set]);
                else setInterest([...interest.filter((v) => v !== set)]);
              }}
              defaultChecked={interest.find((v) => v === set) ? true : false}
            />
            <label
              className="flex px-2 py-1 bg-sub peer-checked:bg-main items-center text-sm"
              htmlFor={set.value}
            >
              <Icon src={set.icon} className="w-3 mr-2" tag="div" />
              {set.value}
            </label>
          </button>
        ))}
      </div>
      {interest.length > 0 && (
        <div className="flex justify-center mt-2 floating">
          <PointerBox>
            {interest.map((interest) => (
              <Icon src={interest.icon} tag="div" className="w-4 mx-1"></Icon>
            ))}
          </PointerBox>
        </div>
      )}
    </SignUpContentSection>
  );
}
