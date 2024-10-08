import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  f1,
  f2,
  f3,
  f4,
  f1_cap,
  f2_cap,
  f3_cap,
  landingImage,
} from "@/assets/export";

import { REVIEWS } from "@/assets/const";
import { MainCustomButton } from "@/components/CustomButton";
import { Review } from "@/assets/type";

function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <>
      {showButton && (
        <div className="fixed right-10 bottom-5 z-10">
          <button
            className="w-12 h-12 rounded-3xl bg-white font-bold text-lg border-2 border-black cursor-pointer opacity-80"
            onClick={scrollToTop}
            type="button"
          >
            TOP
          </button>
        </div>
      )}
    </>
  );
}

function LandingSectionCaption({ src }: { src: string }) {
  return (
    <div className="w-28 mx-auto mt-10 box-border">
      <img src={src} className="w-full block" alt="" />
    </div>
  );
}

function LandingSectionTitle({ children }: ComponentPropsWithoutRef<"h2">) {
  return <h2 className="pt-5 font-bold text-xl text-center">{children}</h2>;
}

function LandingSectionSubTitle({ children }: ComponentPropsWithoutRef<"h4">) {
  return <h4 className="text-sm py-3 text-center">{children}</h4>;
}

function LandingReviewArticle({ point, info }: Review) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.setAttribute("style", `width: ${(100 * point) / 5}%`);
  }, [point]);

  return (
    <article className="flex flex-col justify-between relative  p-3 w-80 aspect-square rounded-2xl shadow-lg bg-white shrink-0">
      <header className="block">
        <div className="w-20">
          <div
            ref={ref}
            className={`overflow-visible relative bg-clip-text bg-main  text-transparent stroke-main star`}
          >
            ★★★★★
          </div>
        </div>
        <h3 className="text-xl">
          {info.univ} 재학, {info.age}세 {info.gender}
        </h3>
      </header>

      <div className="text-base box-border p-7">{info.content}</div>
      <span className="self-end block text-opacity-40 text-black">
        {info.date}
      </span>
    </article>
  );
}

function LandingMainSection({ children }: ComponentPropsWithoutRef<"div">) {
  const captureRef = useRef<HTMLDivElement>(null);

  const [heightFixed, setHeightFixed] = useState<boolean>(false);

  const [markedWindowSize, setMarkedWindowSize] = useState<number>(0);

  useEffect(() => {
    setMarkedWindowSize(window.innerHeight);
  }, []);

  const resizeEvent = useCallback(
    (e: UIEvent) => {
      const renderedH = captureRef.current?.offsetHeight;

      const window = e.target as Window;

      if (renderedH) {
        captureRef.current?.setAttribute(
          "style",
          `height: ${renderedH * (window.innerHeight / markedWindowSize)}px`
        );
      }

      window.removeEventListener("resize", resizeEvent);
    },
    [markedWindowSize]
  );

  useEffect(() => {
    window.addEventListener("resize", resizeEvent);
  }, [markedWindowSize]);

  useLayoutEffect(() => {
    const renderedH = captureRef.current?.offsetHeight;
    captureRef.current?.setAttribute("style", `height: ${renderedH}px`);
    setHeightFixed(true);
  }, []);

  return (
    <div
      className="grow flex items-center relative justify-center overflow-y-hidden"
      ref={captureRef}
    >
      {heightFixed && children}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main
        className={
          "flex flex-col w-full items-center mt-header-height relative"
        }
      >
        <TopButton></TopButton>
        <div className="w-full flex flex-col h-landing-height bg-top bg-no-repeat relative isolate after:content-[''] after:absolute after:bg-white after:-z-10">
          <h1 className="z-30 grow text-center text-3xl text-white font-bold py-10">
            내게 꼭 맞는 사람? <br /> 미리 알고 만날 수 있어
          </h1>
          <div className="absolute top-0 left-0 w-full h-full opacity-80">
            <img className="w-full h-full" src={landingImage} alt="랜딩 배경" />
          </div>
          <footer className="z-30 mb-10 w-full flex flex-col bg-transparent items-center justify-start">
            <MainCustomButton
              className="!w-72 !h-12 !font-bold !text-xl "
              onClick={() => navigate("/signup")}
            >
              시작하기
            </MainCustomButton>
            <button
              onClick={() => navigate("/signin")}
              className="text-md font-bold mt-2 relative after:absolute after:bottom-0 after:left-0 after:content-[''] after:block hover:after:w-full after:h-0 after:box-border hover:after:border-b-2 hover:after:border-black"
            >
              이미 계정이 있다면? 로그인하기
            </button>
          </footer>
        </div>
        <div className="w-full h-landing-height flex flex-col items-center">
          <LandingSectionCaption src={f1} />
          <LandingSectionTitle>
            아무에게나 사진을 공개하지 않아요.
          </LandingSectionTitle>
          <LandingSectionSubTitle>
            프로필이 마음에 드는 사람에게만 사진을 공개해요.
            <br />
            서로의 사진은 서로만 확인할 수 있어요!
          </LandingSectionSubTitle>
          <LandingMainSection>
            <img className="h-[75%]" src={f1_cap} alt="프로필 확인 쪽지" />
          </LandingMainSection>
        </div>
        <div className="w-full h-landing-height flex flex-col items-center bg-main">
          <LandingSectionCaption src={f2}></LandingSectionCaption>
          <LandingSectionTitle>
            안전한 상대만 만날 수 있어요.
          </LandingSectionTitle>
          <LandingSectionSubTitle>
            프로필에서 본인 인증, 학교 인증,
            <br />
            성병(매독, 임질, 에이즈) 검사 인증
            <br />
            배지를 확인하세요!
          </LandingSectionSubTitle>
          <LandingMainSection>
            <img src={f2_cap} className="w-[72%]" alt="인증" />
          </LandingMainSection>
        </div>
        <div className="w-full h-landing-height flex flex-col items-center bg-mint">
          <LandingSectionCaption src={f3}></LandingSectionCaption>
          <LandingSectionTitle>
            원하는 성향의 상대만 만나세요.
          </LandingSectionTitle>
          <LandingSectionSubTitle>
            온새미로는 다양한 성적 성향을 존중해요.
            <br />
            내가 고른 성향의 사람만 보여드려요.
          </LandingSectionSubTitle>
          <LandingMainSection>
            <img src={f3_cap} className="h-[75%]" alt="성향" />
          </LandingMainSection>
        </div>
        <div className="w-full h-landing-height flex flex-col items-center bg-sub">
          <LandingSectionCaption src={f4}></LandingSectionCaption>
          <div className="w-full p-3 grow flex items-center">
            <div className="mb-48 mt-10 box-border px-[5%] flex flex-row flex-nowrap gap-5 overflow-x-scroll">
              {REVIEWS.map((review, i) => (
                <LandingReviewArticle
                  key={i}
                  point={review.point}
                  info={review.info}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
