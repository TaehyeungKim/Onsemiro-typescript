import { CategorySet } from "@/assets/type";
import { SignUpClientStoreData, SignUpSubmitData } from "@/routes/Signup/type";

export interface IdealChoiceSettingLayoutProps
  extends React.ComponentPropsWithoutRef<"div"> {
  close: () => void;
}

export interface IdealChoiceCategoryLayoutProps
  extends IdealChoiceSettingLayoutProps {}

export interface IdealChoiceDetailLayoutProps
  extends IdealChoiceSettingLayoutProps {
  caption: string;
  category: CategorySet;
  select: (data: SignUpClientStoreData["preference"]) => void;
  reqType: keyof SignUpSubmitData["ideal_condition"];
}
