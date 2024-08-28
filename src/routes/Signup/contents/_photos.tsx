import { useRef, useCallback } from "react";
import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { SignUpContentSection, SectionTitle } from "./_base";
import Icon from "@/components/Icon";
import { Upload } from "@/assets/buttons/export";

export default function Photos() {
  const photoRef = useRef<HTMLInputElement>(null);
  const stdRef = useRef<HTMLInputElement>(null);

  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  const openFileInput = useCallback(
    (fileRef: React.RefObject<HTMLInputElement>) => {
      return () => fileRef.current?.click();
    },
    [photoRef, stdRef]
  );

  return (
    <>
      <SignUpContentSection>
        <h5>사진과 성병 검사지를 업로드 해주세요.</h5>
      </SignUpContentSection>
      <SignUpContentSection>
        <div className="w-full">
          <SectionTitle>사진</SectionTitle>
          <p className="mt-3">사진은 매칭 수락 시에만 서로 볼 수 있어요.</p>
          <p className="mt-3">
            사진을 업로드하지 않을 수 있지만, 사진을 업로드하지 않으면 상대방의
            사진도 볼 수 없어요.
          </p>
          <p className="mt-3">사진은 반드시, 얼굴이 나온 사진이어야 해요!</p>
          <button
            className="flex items-center justify-center bg-input min-h-11 w-full mt-3 rounded-lg box-border p-2"
            onClick={openFileInput(photoRef)}
          >
            {!signUpData.photo ? (
              <>
                <Icon src={Upload} className="w-9 mr-2" tag="div"></Icon>
                업로드하기
              </>
            ) : (
              <span className="break-all">{signUpData.photo.name}</span>
            )}
          </button>
          <input
            type="file"
            hidden
            accept="image/*"
            ref={photoRef}
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                photo: e.target.files && e.target.files[0],
              })
            }
          />
        </div>
      </SignUpContentSection>
      <SignUpContentSection>
        <div className="w-full">
          <SectionTitle>성병 검사지</SectionTitle>
          <button
            className="flex items-center justify-center bg-input min-h-11 w-full mt-3 rounded-lg"
            onClick={openFileInput(stdRef)}
          >
            {!signUpData.std_test_report ? (
              <>
                <Icon src={Upload} className="w-9 mr-2" tag="div" />
                업로드하기
              </>
            ) : (
              signUpData.std_test_report.name
            )}
          </button>
          <input
            type="file"
            hidden
            accept="image/*"
            ref={stdRef}
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                std_test_report: e.target.files && e.target.files[0],
              })
            }
          />
        </div>
      </SignUpContentSection>
    </>
  );
}
