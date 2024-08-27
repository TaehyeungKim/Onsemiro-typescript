export type SignUpSubmitData = {
  univ: string;
  email: string;
  kakao_id: string;
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
