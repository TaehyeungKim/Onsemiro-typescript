export type SignUpSubmitData = {
  univ: string;
  email: string;
  kakao_id: string;
  nickname: string;
  gender: string;
  age: number;
};

export type SignUpClientStoreData = SignUpSubmitData & {
  verifyCode: string;
  phoneVerification: boolean;
  schoolVerification: boolean;
};

export interface SignUpPageContentProps {
  level: number;
  floatListener: () => void;
}
