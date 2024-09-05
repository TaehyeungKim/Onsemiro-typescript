import { SignUpContentSection } from "./_base";
import { signUpState } from "@/state/state";
import {
  IdealChoiceSettingProps,
  IdealChoiceCategoryProps,
  IdealConditionSelectProps,
  IdealChoiceCategoryDetailProps,
} from "./type";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useCallback, useEffect, useMemo } from "react";
import Icon from "@/components/Icon";
import { Categories, IdealCategoryCaption } from "@/assets/const";
import { CategorySet } from "@/assets/type";
import { createPortal } from "react-dom";

import { SignUpClientStoreData, SignUpSubmitData } from "../type";
import { RecursiveFloatingContainer } from "@/components/UIEffect/Floating";
import {
  IdealChoiceDetailLayout,
  IdealChoiceSettingLayout,
} from "@/layout/SignUpRelated";
import * as IdealSetting from "./_ideal-detail";

function ConditionSelect({ label, reqType }: IdealConditionSelectProps) {
  const signUpData = useRecoilValue(signUpState);
  const [settingVisible, setSettingVisible] = useState<boolean>(false);

  return (
    <>
      {createPortal(
        <IdealChoiceSetting
          reqType={reqType}
          visible={settingVisible}
          close={() => setSettingVisible(false)}
        />,
        document.getElementById("appFrame") as Element
      )}
      <div className="bg-input flex flex-col items-center w-full rounded-lg">
        <h3 className="py-7 text-2xl text-center font-bold">{label}</h3>
        {!signUpData.preference || !signUpData.preference[reqType] ? (
          <button
            className="h-12 mb-4 block w-fit after:content-[''] after:w-full after:block after:border-b-2 after:border-main text-main"
            onClick={() => setSettingVisible(true)}
          >
            고르기
          </button>
        ) : (
          <button
            className=" bg-input-less-darker w-4/5 py-3 flex justify-center items-center rounded-lg mb-4"
            onClick={() => {
              setSettingVisible(true);
            }}
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

function IdealChoiceCategoryDetail({
  back,
  category,
  reqType,
  select,
}: IdealChoiceCategoryDetailProps) {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  const props = useMemo(() => {
    return {
      reqType,
      data: signUpData,
    };
  }, [signUpData, reqType, category]);

  return (
    <IdealChoiceDetailLayout
      key={category.category}
      caption={IdealCategoryCaption[category.category]}
      close={back}
      category={category}
      select={(data: SignUpClientStoreData["preference"]) => {
        setSignUpData({
          ...signUpData,
          preference: {
            ...signUpData.preference,
            ...data,
          },
        });
        select();
      }}
      reqType={reqType}
    >
      {(() => {
        switch (category.category) {
          case "age":
            return (
              <IdealSetting.IdealAgeSetting
                {...props}
              ></IdealSetting.IdealAgeSetting>
            );
          case "bdsm":
            return (
              <IdealSetting.IdealBDSMSetting
                {...props}
              ></IdealSetting.IdealBDSMSetting>
            );
          case "height":
            return (
              <IdealSetting.IdealHeightSetting
                {...props}
              ></IdealSetting.IdealHeightSetting>
            );
          case "weight":
            return (
              <IdealSetting.IdealWeightSetting
                {...props}
              ></IdealSetting.IdealWeightSetting>
            );
          case "appearance":
            return (
              <IdealSetting.IdealAppearanceSetting
                {...props}
              ></IdealSetting.IdealAppearanceSetting>
            );
          case "eyelid":
            return (
              <IdealSetting.IdealEyelidSetting
                {...props}
              ></IdealSetting.IdealEyelidSetting>
            );
          case "mbti":
            return (
              <IdealSetting.IdealMBTISetting
                {...props}
              ></IdealSetting.IdealMBTISetting>
            );
          case "character":
            return (
              <IdealSetting.IdealCharacterSetting
                {...props}
              ></IdealSetting.IdealCharacterSetting>
            );
          case "location":
            return (
              <IdealSetting.IdealLocationSetting
                {...props}
              ></IdealSetting.IdealLocationSetting>
            );
        }
      })()}
    </IdealChoiceDetailLayout>
  );
}

function IdealChoiceSetting({
  reqType,
  visible,
  close,
}: IdealChoiceSettingProps) {
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [categorySelected, setCategorySelected] = useState<CategorySet>();

  const selectCategory = (set: CategorySet) => {
    setCategorySelected(set);
    setCategoryVisible(false);
  };

  useEffect(() => {
    if (visible && !categorySelected) setCategoryVisible(true);
  }, [visible]);

  if (!visible) return <></>;

  if (categoryVisible)
    return (
      <IdealChoiceCategory
        reqType={reqType}
        close={close}
        open={(set: CategorySet) => selectCategory(set)}
      />
    );
  if (!categoryVisible && categorySelected) {
    return (
      <IdealChoiceCategoryDetail
        back={() => {
          setCategoryVisible(true);
          setCategorySelected(undefined);
        }}
        select={() => {
          close();
          setCategorySelected(undefined);
        }}
        category={categorySelected}
        reqType={reqType}
      />
    );
  }
  return <></>;
}

function IdealChoiceCategory({
  reqType,

  close,
  open,
}: IdealChoiceCategoryProps) {
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

  return (
    <IdealChoiceSettingLayout close={close}>
      <div className="absolute w-full px-4 pt-10 top-0 bottom-0  box-border flex flex-col">
        <SignUpContentSection>
          <h5 className="text-lg">원하는 이상형의 조건을 선택해주세요.</h5>
        </SignUpContentSection>
        <SignUpContentSection className="overflow-hidden grow">
          <RecursiveFloatingContainer
            floating="floating"
            className="w-11/12 mx-auto"
          >
            <>
              {Categories.map((set) => (
                <button
                  key={set.label}
                  className={`bg-input w-full py-3 flex justify-center items-center rounded-lg my-3 cursor-pointer ${
                    blockChoices(set.category) ? "opacity-30" : ""
                  }`}
                  onClick={() => {
                    if (!blockChoices(set.category)) {
                      open(set);
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
    </IdealChoiceSettingLayout>
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
        <div className="flex flex-row w-11/12 mx-auto gap-3 flex-wrap">
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
