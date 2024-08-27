import { instance, instanceWithToken } from "./axios";
import {
  SignInData,
  SignUpCheckVerifData,
  SignUpPhoneVerifData,
  SignUpSchoolVerifData,
} from "./type";

export const signIn = async (data: SignInData) => {
  const res = await instance.post("/account/signin/", data);

  if (res.status === 200) {
    return true;
  } else console.log("Error");
};

export const signUp = async (data: SignUpPhoneVerifData) => {
  const response = await instance.post("/account/signup/", data);
  if (response.status === 200 || response.status === 201) {
    return true;
  } else {
    console.log("Error");
  }
  return false;
};

export const requestSchoolVerifyCode = async (data: SignUpSchoolVerifData) => {
  const response = await instanceWithToken.post("/account/email/", data);
  if (response.status === 200 || response.status === 201) {
    return true;
  } else {
    console.log("Error");
  }
  return false;
};

//dummy
export const checkSchoolVerifyCode = async (data: SignUpCheckVerifData) => {
  return new Promise((resolve, reject) => {
    // setTimeout(() => reject(false), 1000);
    setTimeout(() => resolve(true), 1000);
  });
};
