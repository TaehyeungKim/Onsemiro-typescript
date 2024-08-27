import type { MBTI } from "../../type";

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
