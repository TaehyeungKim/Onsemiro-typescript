import { atom } from "recoil";
import { SignUpClientStoreData } from "@/routes/Signup/type";
import { DEFAULT_MBTI_VALUE } from "@/assets/const";

export const signUpState = atom<SignUpClientStoreData>({
  key: "signUp",
  default: {
    univ: "",
    email: "",
    phoneVerification: false,
    schoolVerification: false,
    verifyCode: "",
    kakao_id: "",
    nickname: "",
    gender: "",
    age: 0,
    gender_preference: "",
    bdsm: "",
    height: 0,
    weight: "",
    appearance: "",
    eyelid: "",
    mbti: "",
    character: "",
    hobby: [],
    meeting_frequency: 0,
    city: "",
    subRegion: "",
    location: "",
    photo: null,
    std_test_report: null,
  },
});

export const idealChoiceVisibleState = atom({
  key: "idealChoice",
  default: {
    visible: false,
    reqType: undefined,
  },
});

export const layoutFloatingEndState = atom<boolean>({
  key: "layoutFloating",
  default: false,
});

export const authSchoolState = atom({
  key: "authSchoolState",
  default: {
    univ: "",
    email: "",
    verification_code: "",
    requested: false,
  },
});

export const recommendDataState = atom({
  key: "recommendDataState",
  default: [],
});

export const requestDataState = atom({
  key: "requestDataState",
  default: [],
});

export const matchDataState = atom({
  key: "matchDataState",
  default: [],
});

export const photoDataState = atom({
  key: "photoDataState",
  default: [],
});

export const activeState = atom({
  key: "activeState",
  default: false,
});
