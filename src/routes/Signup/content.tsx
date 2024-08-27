import { SignUpPageContentProps } from "./type";
import { AuthenticateSelf, KakaoAuth } from "./contents/export";
import { RecursiveFloatingContainer } from "@/components/UIEffect/Floating";

export default function SignUpPageContent({
  level,
  floatListener,
}: SignUpPageContentProps) {
  return (
    <main className="px-2 flex flex-col w-full h-fit grow">
      <RecursiveFloatingContainer
        floating="floating"
        floatMode="animationend"
        listener={floatListener}
      >
        <>
          {(() => {
            switch (level) {
              case 0:
                return <AuthenticateSelf />;
              case 1:
                return <KakaoAuth />;
              // case 2:
              //   return <NickNameInput />;
              // case 3:
              //   return <AgeAndGender />;
              // case 4:
              //   return <Sexual />;
              // case 5:
              //   return <Appearance />;
              // case 6:
              //   return <Character />;
              // case 7:
              //   return <Interest />;
              // case 8:
              //   return <FrequencyAndLocation />;
              // case 9:
              //   return <Photos />;
              // case 10:
              //   return <Introduction />;
              // case 11:
              //   return <PreferIdentity />;
              // case 12:
              //   return <SameUniv />;
              // case 13:
              //   return <Ideal />;
              default:
            }
          })()}
        </>
      </RecursiveFloatingContainer>
    </main>
  );
}
