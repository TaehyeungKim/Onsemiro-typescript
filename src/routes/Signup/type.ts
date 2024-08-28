import { CitySet } from "@/assets/type";
import { InferElementInArray } from "@/components/global/util";

export type MBTI = {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

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
};

export type SignUpClientStoreData = SignUpSubmitData & {
  verifyCode: string;
  phoneVerification: boolean;
  schoolVerification: boolean;
  city: CitySet["city"];
  subRegion: InferElementInArray<CitySet["sub"]>;
};

export interface SignUpPageContentProps {
  level: number;
  floatListener: () => void;
}
