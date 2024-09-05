import Icon from "@/components/Icon";
import { Back } from "@/assets/buttons/export";
import {
  IdealChoiceCategoryLayoutProps,
  IdealChoiceDetailLayoutProps,
  IdealChoiceSettingLayoutProps,
} from "./type";
import {
  FloatElement,
  RecursiveFloatingContainer,
} from "@/components/UIEffect/Floating";
import { createContext, useState } from "react";
import { MainCustomButton } from "@/components/CustomButton";
import {
  SignUpClientStoreData,
  SignUpPreferenceData,
} from "@/routes/Signup/type";

export function IdealChoiceSettingLayout({
  children,
  close,
}: IdealChoiceSettingLayoutProps) {
  return (
    <div className="absolute top-0 left-0 bg-white w-full h-full flex flex-col">
      <header className="p-3 z-20">
        <Icon
          src={Back}
          className="w-5 block"
          tag="button"
          onClick={() => {
            close();
          }}
        />
      </header>
      {children}
    </div>
  );
}

export function IdealChoiceCategoryLayout({
  children,
  close,
}: IdealChoiceCategoryLayoutProps) {
  return (
    <IdealChoiceSettingLayout close={close}>
      {children}
    </IdealChoiceSettingLayout>
  );
}

export const IdealChoiceSetContext = createContext<{
  setter: ((preference: SignUpPreferenceData | undefined) => void) | undefined;
}>({
  setter: undefined,
});

export function IdealChoiceDetailLayout({
  children,
  close,
  caption,
  category,
  select,
  reqType,
}: IdealChoiceDetailLayoutProps) {
  const [choice, setChoice] = useState<SignUpPreferenceData>();

  return (
    <IdealChoiceSettingLayout close={close}>
      <IdealChoiceSetContext.Provider
        value={{ setter: (preference) => setChoice(preference) }}
      >
        <RecursiveFloatingContainer
          floating="floating"
          floatMode="animationend"
          className="h-full flex flex-col"
        >
          <>
            <h5 className="mt-12 mx-3 text-xl">{caption}</h5>
            <section className="grow flex flex-col justify-center px-3 box-border">
              {children}
            </section>
            <div className="h-14 mb-4">
              <FloatElement condition={choice}>
                <MainCustomButton
                  onClick={() => {
                    select({
                      [reqType]: choice,
                    });
                  }}
                >{`'${category.label}' 선택하기`}</MainCustomButton>
              </FloatElement>
            </div>
          </>
        </RecursiveFloatingContainer>
      </IdealChoiceSetContext.Provider>
    </IdealChoiceSettingLayout>
  );
}
