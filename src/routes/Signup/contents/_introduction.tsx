import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { SignUpContentSection } from "./_base";

export default function Introduction() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  return (
    <>
      <SignUpContentSection>
        <h5>
          자기소개가 있다면, 앞 문항을 통해 완전히 드러내지 못한 나를 보여줄 수
          있어요!
        </h5>
      </SignUpContentSection>

      <SignUpContentSection>
        <div className="w-full">
          <h5>간단한 자기소개를 적어주세요.</h5>
          <div className="w-11/12 aspect-square bg-input rounded-lg mx-auto mt-4">
            <textarea
              className="block w-full h-full resize-none outline-none p-4 bg-transparent"
              placeholder="자기소개를 적어주세요."
              onChange={(e) =>
                setSignUpData({ ...signUpData, introduction: e.target.value })
              }
              defaultValue={signUpData.introduction}
            ></textarea>
          </div>
        </div>
      </SignUpContentSection>
    </>
  );
}
