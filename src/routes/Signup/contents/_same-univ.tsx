import { useRecoilState } from "recoil";
import { signUpState } from "@/state/state";
import { SignUpContentSection } from "./_base";
import Icon from "@/components/Icon";
import { No, Ok } from "@/assets/buttons/export";

export default function SameUniv() {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  return (
    <>
      <SignUpContentSection>
        <h5>온새미로에서 당신과 같은 대학의 사람들을 만나도 상관 없나요?</h5>
      </SignUpContentSection>
      <SignUpContentSection className="mt-10">
        <div className="px-10 w-full">
          <button className="h-10 block w-full overflow-hidden rounded-md mb-3">
            <input
              type="radio"
              hidden
              name="same_univ"
              id="ok"
              className="peer"
              value="true"
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  match_same_univ: e.target.value === "true",
                })
              }
              defaultChecked={signUpData.match_same_univ === true}
            />
            <label
              htmlFor="ok"
              className="w-full h-full flex peer-checked:bg-main bg-input justify-center items-center"
            >
              <Icon tag="div" className="w-3" src={Ok} />
              상관없어요.
            </label>
          </button>
          <button className="h-10 block w-full overflow-hidden rounded-md mb-3">
            <input
              type="radio"
              hidden
              name="same_univ"
              id="no"
              className="peer"
              value={"false"}
              defaultChecked={signUpData.match_same_univ === false}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  match_same_univ: e.target.value === "true",
                })
              }
            />
            <label
              htmlFor="no"
              className="w-full h-full flex peer-checked:bg-main bg-input justify-center items-center"
            >
              <Icon tag="div" className="w-3" src={No} />
              배제해주세요.
            </label>
          </button>
        </div>
      </SignUpContentSection>
    </>
  );
}
