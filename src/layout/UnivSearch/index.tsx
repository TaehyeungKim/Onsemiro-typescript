import { CustomTextInput } from "@/components/CustomInput";
import { useState, useEffect } from "react";
import {
  UnivSearchInputSectionProps,
  UnivSearchOverlayLayoutProps,
  UnivSearchResultsSectionProps,
} from "./type";
import { AUTH_UNIV_LIST } from "@/assets/const";
import { InferElementInArray } from "@/components/global/util";
import { OverlayStandardLayout } from "../base";

function UnivSearchInputSection({
  setter,
  defaultValue,
}: UnivSearchInputSectionProps) {
  return (
    <div className="w-full">
      <CustomTextInput
        id={"univ_search_input"}
        placeholder={"대학을 검색하세요. (ex: 서울대학교)"}
        onChange={(e) => {
          setter(e.target.value);
        }}
        defaultValue={defaultValue}
      />
    </div>
  );
}

function UnivSearchResultsSection({
  select,
  results = [],
}: UnivSearchResultsSectionProps) {
  return (
    <div className="w-overlay-search">
      {!results ? (
        <p className="w-full flex items-center justify-center text-center h-28">
          검색된 결과가 없습니다.
        </p>
      ) : (
        <section className="w-full h-28 overflow-y-scroll grid grid-cols-3 gap-3">
          {results.map((result) => (
            <div key={result} className="w-full h-10">
              <input
                type="radio"
                hidden
                id={`search_${result}`}
                className="peer"
                onChange={(e) => select(e.target.value)}
                value={result}
                name="search"
              ></input>
              <label
                htmlFor={`search_${result}`}
                className="h-full w-full  bg-main text-center rounded-md shadow-md flex items-center justify-center text-white cursor-pointer"
              >
                {result}
              </label>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export function UnivSearchOverlayLayout({
  select,
  defaultValue,
  close,
}: UnivSearchOverlayLayoutProps) {
  const [input, setInput] = useState<string>(defaultValue);
  const [results, setResults] = useState<string[] | null>(AUTH_UNIV_LIST);

  useEffect(() => {
    if (input) {
      const results = [AUTH_UNIV_LIST.find((univ) => univ === input)];

      if (results.length === 1 && !results[0]) setResults(null);
      else setResults(results as string[]);
    } else setResults(AUTH_UNIV_LIST);
  }, [input]);

  return (
    <OverlayStandardLayout close={close}>
      <UnivSearchInputSection setter={setInput} defaultValue={defaultValue} />
      <UnivSearchResultsSection results={results} select={select} />
    </OverlayStandardLayout>
  );
}
