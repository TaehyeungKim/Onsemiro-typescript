import { CitySet } from "@/assets/type";
import type { MBTI } from "../../type";
import { InferElementInArray } from "@/components/global/util";

export interface MBTILetterRowProps {
  order: "first" | "second" | "third" | "fourth";
  item: "E" | "S" | "T" | "J";
  counter: "I" | "N" | "F" | "P";
  data: MBTI;
  setter: (mbti: MBTI) => void;
}

export interface MBTISettingSectionProps {
  mbti: string;
  setter: (character: string) => void;
}

export interface CharacterSettingSectionProps {
  character: string;
  setter: (character: string) => void;
}

export interface SelectRegionLowProps {
  label: string;
  regions: CitySet["city"][] | CitySet["sub"];
  setter: (data: CitySet["city"] | InferElementInArray<CitySet["sub"]>) => void;
  selected: CitySet["city"] | InferElementInArray<CitySet["sub"]>;
}

export interface SelectRegionsProps {
  setter: {
    city: (city: CitySet["city"]) => void;
    sub: (sub: InferElementInArray<CitySet["sub"]>) => void;
  };
  set: CitySet[];
  selected: {
    city: CitySet["city"];
    sub: InferElementInArray<CitySet["sub"]>;
  };
}

export interface MeetFrequencyProps {
  meetNum: number;
  setter: (meetNum: number) => void;
}
