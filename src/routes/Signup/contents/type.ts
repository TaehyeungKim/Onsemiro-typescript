import { CategorySet } from "@/assets/type";
import {
  IdealCategory,
  SignUpClientStoreData,
  SignUpSubmitData,
} from "../type";

export interface IdealChoiceCategoryProps {
  reqType: keyof SignUpSubmitData["ideal_condition"];

  close: () => void;
  open: (set: CategorySet) => void;
}

export interface IdealConditionSelectProps {
  reqType: keyof SignUpSubmitData["ideal_condition"];
  label: JSX.Element;
}

export interface IdealChoiceSettingProps {
  reqType: keyof SignUpSubmitData["ideal_condition"];
  visible: boolean;
  close: () => void;
}

export interface IdealChoiceCategoryDetailProps {
  back: () => void;
  select: () => void;
  category: CategorySet;
  reqType: keyof SignUpSubmitData["ideal_condition"];
}

export interface IdealChoiceDataSetProps {
  reqType: keyof SignUpSubmitData["ideal_condition"];
  data: SignUpClientStoreData;
}
