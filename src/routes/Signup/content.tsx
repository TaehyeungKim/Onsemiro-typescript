import { SignUpPageContentProps } from "./type";
import * as Contents from "./contents/export";
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
                <Contents.AuthenticateSelf />
              </ContentFloatContainer>
            );
          case 1:
            return (
              <ContentFloatContainer key={1} floatListener={floatListener}>
                <Contents.KakaoAuth />
              </ContentFloatContainer>
            );
          case 2:
            return (
              <ContentFloatContainer key={2} floatListener={floatListener}>
                <Contents.NickName />
              </ContentFloatContainer>
            );

          case 3:
            return (
              <ContentFloatContainer key={3} floatListener={floatListener}>
                <Contents.AgeAndGender />
              </ContentFloatContainer>
            );
          case 4:
            return (
              <ContentFloatContainer key={4} floatListener={floatListener}>
                <Contents.Sexual />
              </ContentFloatContainer>
            );

          case 5:
            return (
              <ContentFloatContainer key={5} floatListener={floatListener}>
                <Contents.Appearance />
              </ContentFloatContainer>
            );
          case 6:
            return (
              <ContentFloatContainer key={6} floatListener={floatListener}>
                <Contents.Character />
              </ContentFloatContainer>
            );
          case 7:
            return (
              <ContentFloatContainer key={7} floatListener={floatListener}>
                <Contents.Interest />
              </ContentFloatContainer>
            );
          case 8:
            return (
              <ContentFloatContainer key={8} floatListener={floatListener}>
                <Contents.FrequencyAndLocation />
              </ContentFloatContainer>
            );
          case 9:
            return (
              <ContentFloatContainer key={9} floatListener={floatListener}>
                <Contents.Photos />
              </ContentFloatContainer>
            );
          case 10:
            return (
              <ContentFloatContainer key={10} floatListener={floatListener}>
                <Contents.Introduction />
              </ContentFloatContainer>
            );
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
