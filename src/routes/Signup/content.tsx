import { SignUpPageContentProps } from "./type";
import {
  AuthenticateSelf,
  KakaoAuth,
  NickName,
  AgeAndGender,
  Sexual,
} from "./contents/export";
import { RecursiveFloatingContainer } from "@/components/UIEffect/Floating";

function ContentFloatContainer({
  floatListener,
  children,
}: Pick<SignUpPageContentProps, "floatListener"> &
  React.ComponentPropsWithoutRef<"div">) {
  return (
    <RecursiveFloatingContainer
      floating="floating"
      floatMode="animationend"
      listener={floatListener}
    >
      <>{children}</>
    </RecursiveFloatingContainer>
  );
}

export default function SignUpPageContent({
  level,
  floatListener,
}: SignUpPageContentProps) {
  return (
    <main className="px-2 flex flex-col w-full h-fit grow">
      {(() => {
        switch (level) {
          case 0:
            return (
              <ContentFloatContainer key={0} floatListener={floatListener}>
                <AuthenticateSelf />
              </ContentFloatContainer>
            );
          case 1:
            return (
              <ContentFloatContainer key={1} floatListener={floatListener}>
                <KakaoAuth />
              </ContentFloatContainer>
            );
          case 2:
            return (
              <ContentFloatContainer key={2} floatListener={floatListener}>
                <NickName />
              </ContentFloatContainer>
            );

          case 3:
            return (
              <ContentFloatContainer key={3} floatListener={floatListener}>
                <AgeAndGender />
              </ContentFloatContainer>
            );
          case 4:
            return (
              <ContentFloatContainer key={4} floatListener={floatListener}>
                <Sexual />
              </ContentFloatContainer>
            );

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
    </main>
  );
}
