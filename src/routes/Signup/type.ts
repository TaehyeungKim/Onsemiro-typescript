import { CitySet } from "@/assets/type";
import { InferElementInArray } from "@/components/global/util";

export type MBTI = {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

export type IdealCategory =
  | "age"
  | "bdsm"
  | "height"
  | "weight"
  | "appearance"
  | "eyelid"
  | "mbti"
  | "character"
  | "location";

export type SignUpSubmitData = {
  univ: string;
  email: string;
  kakao_id: string;
  nickname: string;
  gender: string;
  age: number;
  gender_preference: string;
  bdsm: string;
  height: number;
  weight: string;
  appearance: string;
  eyelid: string;
  mbti: string;
  character: string;
  hobby: string[];
  meeting_frequency: number;
  location: string;
  photo: File | null | undefined;
  std_test_report: File | null | undefined;
  introduction: string;
  gender_wanted: string;
  match_same_univ: boolean | undefined;
  ideal_condition: {
    required?: IdealCategory;
    optional_1?: IdealCategory;
    optional_2?: IdealCategory;
  };
};

export type SignUpPreferenceData = {
  [category in Exclude<
    IdealCategory,
    "age" | "height" | "location"
  >]?: SignUpSubmitData[category];
} & {
  age?: {
    age_min: number;
    age_max: number;
  };
  height?: {
    height_min: number;
    height_max: number;
  };
  location?: {
    city: SignUpClientStoreData["city"];
    subRegion: SignUpClientStoreData["subRegion"];
  };
};

export type SignUpClientStoreData = SignUpSubmitData & {
  verifyCode: string;
  phoneVerification: boolean;
  schoolVerification: boolean;
  city: CitySet["city"];
  subRegion: InferElementInArray<CitySet["sub"]>;
  preference: {
    [type in keyof SignUpSubmitData["ideal_condition"]]: SignUpPreferenceData;
  };
};

export interface SignUpPageContentProps {
  level: number;
  floatListener: () => void;
}
