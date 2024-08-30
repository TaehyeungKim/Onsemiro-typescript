import { SignUpContentSection } from "./_base";
import { signUpState } from "@/state/state";
import {
  IdealConditionSelectCategoryProps,
  IdealConditionSelectProps,
} from "./type";
import { useRecoilValue } from "recoil";
import { useState, useCallback } from "react";
import Icon from "@/components/Icon";
import { Categories } from "@/assets/const";
import { CategorySet } from "@/assets/type";
import { createPortal } from "react-dom";
import { Back } from "@/assets/buttons/export";
import { SignUpSubmitData } from "../type";
import { RecursiveFloatingContainer } from "@/components/UIEffect/Floating";

function ConditionSelect({ label, reqType }: IdealConditionSelectProps) {
  const signUpData = useRecoilValue(signUpState);
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);

  return (
    <>
      {createPortal(
        <IdealChoiceCategory
          reqType={reqType}
          visible={categoryVisible}
          toggle={setCategoryVisible}
        />,
        document.getElementById("appFrame") as Element
      )}
      <div className="bg-input flex flex-col items-center w-full rounded-lg">
        <h3 className="py-7 text-2xl text-center font-bold">{label}</h3>
        {!signUpData.preference || !signUpData.preference[reqType] ? (
          <button
            className="h-12 mb-8 block w-fit after:content-[''] after:w-full after:block after:border-b-2 after:border-main text-main"
            onClick={() => setCategoryVisible(true)}
          >
            고르기
          </button>
        ) : (
          <button
            className=" bg-input-less-darker w-4/5 py-3 flex justify-center items-center rounded-lg mb-5"
            onClick={() => setCategoryVisible(true)}
          >
            <div className="w-5 mr-2">
              <Icon
                src={
                  (
                    Categories.find(
                      (set) =>
                        set.category ===
                        Object.keys(signUpData.preference[reqType]!)[0]
                    ) as CategorySet
                  ).icon
                }
                tag="div"
                className="w-5 mr-2"
              />
            </div>
            {
              (
                Categories.find(
                  (set) =>
                    set.category ===
                    Object.keys(signUpData.preference[reqType]!)[0]
                ) as CategorySet
              ).label
            }
          </button>
        )}
      </div>
    </>
  );
}

function IdealChoiceCategory({
  reqType,
  visible,
  toggle,
}: IdealConditionSelectCategoryProps) {
  const signUpData = useRecoilValue(signUpState);

  const blockChoices = useCallback(
    (category: CategorySet["category"]) => {
      const others = (
        [
          "required",
          "optional_1",
          "optional_2",
        ] satisfies (keyof SignUpSubmitData["ideal_condition"])[]
      ).filter((key) => key !== reqType);

      return others.some((key) =>
        signUpData.preference[key]?.hasOwnProperty(category)
      );
    },
    [reqType]
  );

  if (!visible) return <></>;

  return (
    <div className="absolute top-0 left-0 bg-white w-full">
      <header className="p-3">
        <Icon
          src={Back}
          className="w-5 block"
          tag="button"
          onClick={() => {
            toggle(false);
          }}
        />
      </header>

      <div className="w-full px-4 pt-3">
        <SignUpContentSection>
          <h5 className="text-lg">원하는 이상형의 조건을 선택해주세요.</h5>
        </SignUpContentSection>
        <SignUpContentSection>
          <RecursiveFloatingContainer
            floating="floating"
            className="w-11/12 mx-auto"
          >
            <>
              {Categories.map((set) => (
                <button
                  key={set.label}
                  className={`bg-input w-full py-3 flex justify-center items-center rounded-lg my-3 cursor-pointer ${
                    blockChoices(set.category) ? "opacity-20" : null
                  }`}
                  onClick={() => {
                    if (!blockChoices(set.category)) {
                      // setIsConditionSetVisible(true);
                      // setType(condition);
                    }
                  }}
                >
                  <Icon className="w-5 mr-4" src={set.icon} tag="div" />
                  {set.label}
                </button>
              ))}
            </>
          </RecursiveFloatingContainer>
        </SignUpContentSection>
      </div>
    </div>
  );
}

export default function Ideal() {
  return (
    <>
      <SignUpContentSection>
        <h5 className="mt-5 leading-6">
          온새미로가 당신께 맞는 이상형을 추천해드릴 수 있게 "이것만은 있으면
          좋겠다!" 필수 조건 1개와 "이런 사람이 좋던데?" 선택 조건 2개{"("}
          1,2순위{")"}를 골라주세요.
        </h5>
      </SignUpContentSection>
      <SignUpContentSection>
        <div className="flex flex-col w-11/12 mx-auto gap-y-3">
          <div className="flex w-full">
            <ConditionSelect label={<>필수 조건</>} reqType={"required"} />
          </div>
          <div className="flex w-full gap-x-3">
            <ConditionSelect
              label={
                <>
                  선택 조건
                  <br />
                  1순위
                </>
              }
              reqType={"optional_1"}
            />
            <ConditionSelect
              label={
                <>
                  선택 조건
                  <br />
                  2순위
                </>
              }
              reqType={"optional_2"}
            />
          </div>
        </div>
      </SignUpContentSection>
    </>
  );
}
