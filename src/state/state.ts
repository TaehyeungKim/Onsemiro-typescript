import { atom } from "recoil";
import { SignUpClientStoreData } from "@/routes/Signup/type";

export const signUpState = atom<SignUpClientStoreData>({
  key: "signUp",
  default: {
    univ: "",
    email: "",
    phoneVerification: false,
    schoolVerification: false,
    verifyCode: "",
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
