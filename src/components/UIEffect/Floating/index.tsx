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
} from "./type";
import { BaseAlertLayoutProps } from "@/layout/Alert/type";
import { NoUserExistsAlert } from "@/components/Overlay";
import { NoUserExistsAlertLayout } from "@/layout/Alert";

// import "./index.css";

export function RecursiveFloatingContainer({
  children,
  floating,
  initial = "hidden",
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
        element.addEventListener("animationstart", () => {
          element.nextElementSibling?.removeAttribute("style");
          element.nextElementSibling?.classList.add(floating);
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

export function FloatAndShrinkOverlay<T extends BaseAlertLayoutProps>({
  Child,
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
          <Child
            {...{
              ...(props as React.ComponentProps<typeof Child>),
              close: () => setShrink(true),
            }}
          >
            {children}
          </Child>
        }
      </div>
    </div>
  );
}
