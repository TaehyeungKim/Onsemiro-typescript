import { instance, instanceWithToken } from "./axios";
import { SignInData } from "./type";

export const signIn = async (data: SignInData) => {
  const res = await instance.post("/account/signin/", data);

  if (res.status === 200) {
    return true;
  } else console.log("Error");
};
