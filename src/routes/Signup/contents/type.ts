import { SignUpSubmitData } from "../type";

export interface IdealConditionSelectCategoryProps {
  reqType: keyof SignUpSubmitData["ideal_condition"];
  visible: boolean;
  toggle: (visible: boolean) => void;
}

export interface IdealConditionSelectProps {
  reqType: keyof SignUpSubmitData["ideal_condition"];
  label: JSX.Element;
}
