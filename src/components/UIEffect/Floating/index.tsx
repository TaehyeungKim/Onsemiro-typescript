import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useDeferredValue,
} from "react";
import {
  RecursiveFloatingContainerProps,
  FloatAndShrinkElementProps,
  FloatAndShrinkOverlayProps,
  FloatElementProps,
} from "./type";

import { OverlayStandardLayoutProps } from "@/layout/base";

// import "./index.css";

export function RecursiveFloatingContainer({
  children,
  floating,
  initial = "hidden",
  floatMode = "animationstart",
  listener,
  ...props
}: RecursiveFloatingContainerProps) {
  const container = useRef<HTMLDivElement>(null);

  const recursiveAttach = useCallback(
    (element: Element, attach: (element: Element) => void) => {
      attach(element);
      const next = element.nextElementSibling;
      if (next) recursiveAttach(next, attach);
    },
    []
  );

  useLayoutEffect(() => {
    const firstElement = container.current?.firstElementChild;

    if (firstElement) {
      recursiveAttach(firstElement, (element: Element) => {
        element.setAttribute("style", `visibility: ${initial}`);
        element.addEventListener(floatMode, () => {
          element.nextElementSibling?.removeAttribute("style");
          element.nextElementSibling?.classList.add(floating);
          if (!element.nextElementSibling) listener && listener();
        });
      });
    }
  }, []);

  useEffect(() => {
    container.current?.firstElementChild?.removeAttribute("style");
    container.current?.firstElementChild?.classList.add(floating);
  }, [floating]);

  return (
    <div {...props} ref={container}>
      {children}
    </div>
  );
}

export function FloatAndShrinkElement({
  children,
  condition,
}: FloatAndShrinkElementProps) {
  const [elementVisibleState, setElementVisibleState] = useState<
    "invisible" | "shrink" | "visible"
  >("invisible");
  const deferredElementVisbleState = useDeferredValue<
    "invisible" | "shrink" | "visible"
  >(elementVisibleState);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (condition) setElementVisibleState("visible");
    else {
      if (deferredElementVisbleState === "visible")
        setElementVisibleState("shrink");
    }
  }, [condition]);

  const attachShrink = useCallback(() => {
    if (elementVisibleState === "shrink") {
      ref.current?.classList.remove("floating");
      ref.current?.classList.add("shrinking");
    } else {
      ref.current?.classList.remove("shrinking");
      ref.current?.classList.add("floating");
    }
  }, [elementVisibleState]);

  useEffect(() => {
    ref.current?.setAttribute("style", "display: block");
  }, [condition]);

  useEffect(() => attachShrink(), [elementVisibleState]);

  const closeWithShrink = useCallback(() => {
    if (elementVisibleState === "shrink") setElementVisibleState("invisible");
  }, [elementVisibleState]);

  useEffect(() => {
    ref.current?.addEventListener("animationend", closeWithShrink);
    return () =>
      ref.current?.removeEventListener("animationend", closeWithShrink);
  }, [elementVisibleState]);

  if (elementVisibleState === "invisible") return <></>;

  return (
    <div className={"floating"} ref={ref}>
      {children}
    </div>
  );
}

export function FloatAndShrinkOverlay<T extends OverlayStandardLayoutProps>({
  Layout,
  close,
  children,
  ...props
}: FloatAndShrinkOverlayProps<T>) {
  const container = useRef<HTMLDivElement>(null);

  const [shrink, setShrink] = useState(false);

  const attachShrink = useCallback(() => {
    if (shrink) {
      container.current?.classList.remove("floating");
      container.current?.classList.add("shrinking");
    }
  }, [shrink]);

  const closeWithShrink = useCallback(() => {
    if (shrink) close();
  }, [shrink]);

  useEffect(() => attachShrink(), [shrink]);

  useEffect(() => {
    container.current?.addEventListener("animationend", closeWithShrink);
    return () =>
      container.current?.removeEventListener("animationend", closeWithShrink);
  }, [shrink]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-background-darker z-40 flex items-center justify-center bg-opacity-90">
      <div ref={container} className={"floating"}>
        {
          <Layout
            {...{
              ...(props as React.ComponentProps<typeof Layout>),
              close: () => setShrink(true),
            }}
          >
            {children}
          </Layout>
        }
      </div>
    </div>
  );
}

export function FloatElement({ children, condition }: FloatElementProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (condition) setVisible(true);
    return () => setVisible(false);
  }, [condition]);

  if (!visible) return <></>;

  return <div className={`floating`}>{children}</div>;
}
