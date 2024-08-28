import { SignUpClientStoreData } from "./type";

export const executeOnDataFulfilled = (
  level: number,
  data: SignUpClientStoreData,
  execute: () => void
) => {
  switch (level) {
    case 0:
      if (data.phoneVerification && data.schoolVerification && data.verifyCode)
        execute();
      break;

    case 1:
      if (data.kakao_id) {
        execute();
      }
      break;

    case 2:
      if (data.nickname) execute();
      break;
    default:
    case 3:
      if (data.gender && data.age) execute();
      break;
    case 4:
      if (data.bdsm && data.gender_preference) execute();
      break;
    case 5:
      if (data.appearance && data.height && data.eyelid && data.weight)
        execute();
      break;
    case 6:
      if (data.mbti && data.character) execute();
      break;
    case 7:
      if (data.hobby && data.hobby.length > 0) execute();
      break;
    case 8:
      if (data.meeting_frequency && data.city && data.subRegion) execute();
      break;

    // case 1:
    //   if (data.kakao_id) execute();
    //   break;

    // case 4:
    //   if (data.bdsm && data.gender_preference) execute();
    //   break;

    // case 7:
    //   if (data.interest && data.interest.length > 0) execute();
    //   break;

    // case 9:
    //   if (data.std && data.photo) execute();
    //   break;
    // case 10:
    //   if (data.introduction) execute();
    //   break;
    // case 11:
    //   if (data.prefer_gender_identity) execute();
    //   break;
    // case 12:
    //   execute();
    //   break;
    // case 13:
    //   execute();
    //   break;
  }
};
