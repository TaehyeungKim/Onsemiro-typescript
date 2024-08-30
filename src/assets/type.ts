import { IdealCategory } from "@/routes/Signup/type";

export type Review = {
  point: number;
  info: {
    univ: string;
    age: number;
    content: string;
    date: string;
    gender: string;
  };
};

export type CharacterKeyMapType = {
  [n in number]: string;
};

export type InterestUnit = {
  icon: string;
  value: string;
};

export type InterestValueSet = InterestUnit[];

type City = string;
type CitySub = string;

export type CitySet = {
  city: City;
  sub: CitySub[];
};

export type CategorySet = {
  category: IdealCategory;
  icon: string;
  label: string;
};
