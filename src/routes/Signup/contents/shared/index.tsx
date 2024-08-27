import {
  CharacterSettingSectionProps,
  MBTILetterRowProps,
  MBTISettingSectionProps,
} from "./type";
import { RangeBar } from "@/components/CustomInput";
import { CharacterKeyMap } from "@/assets/const";
import { useEffect, useState, useCallback } from "react";
import { MBTI } from "../../type";

function MBTILetterRow({
  order,
  item,
  counter,
  data,
  setter,
}: MBTILetterRowProps) {
  return (
    <div className="flex flex-row items-center mb-4">
      <button>
        <input
          type="radio"
          hidden
          name={order}
          id={item}
          value={item}
          className="peer"
          onChange={(e) => setter({ ...data, [order]: e.target.value })}
          checked={data[order] === item ? true : false}
        />
        <label
          className="px-4 py-3 bg-pale flex justify-center w-16 box-border rounded-md shadow-lg peer-checked:bg-main"
          htmlFor={item}
        >
          {item}
        </label>
      </button>
      <div className="h-3 grow bg-pale"></div>
      <button>
        <input
          type="radio"
          hidden
          name={order}
          id={counter}
          value={counter}
          className="peer"
          onChange={(e) => setter({ ...data, [order]: e.target.value })}
          checked={data[order] === counter ? true : false}
        />
        <label
          className="px-4 py-3 bg-pale flex justify-center w-16 box-border rounded-md shadow-lg peer-checked:bg-main"
          htmlFor={counter}
        >
          {counter}
        </label>
      </button>
    </div>
  );
}

export function MBTISettingSection({ mbti, setter }: MBTISettingSectionProps) {
  const [data, setData] = useState<MBTI>({
    first: mbti[0],
    second: mbti[1],
    third: mbti[2],
    fourth: mbti[3],
  });

  useEffect(() => {
    setter(`${data.first}${data.second}${data.third}${data.fourth}`);
  }, [data]);

  return (
    <>
      <div className="px-10">
        <MBTILetterRow
          order={"first"}
          item={"E"}
          counter={"I"}
          data={data}
          setter={(mbti) => setData(mbti)}
        />
        <MBTILetterRow
          order={"second"}
          item={"S"}
          counter={"N"}
          data={data}
          setter={(mbti) => setData(mbti)}
        />
        <MBTILetterRow
          order={"third"}
          item={"T"}
          counter={"F"}
          data={data}
          setter={(mbti) => setData(mbti)}
        />
        <MBTILetterRow
          order={"fourth"}
          item={"J"}
          counter={"P"}
          data={data}
          setter={(mbti) => setData(mbti)}
        />
      </div>
      <h5 className="text-center text-lg">{`${data.first}${data.second}${data.third}${data.fourth}`}</h5>
    </>
  );
}

export function CharacterSettingSection({
  character,
  setter,
}: CharacterSettingSectionProps) {
  const defaultValue = useCallback((character: string) => {
    for (const [key, value] of Object.entries(CharacterKeyMap)) {
      if (value === character) return parseInt(key);
    }
    return 0;
  }, []);

  const [characterIndex, setCharacterIndex] = useState(defaultValue(character));

  useEffect(() => {
    setCharacterIndex(defaultValue(character));
  }, [character]);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-11/12 mt-14">
          <RangeBar
            max={4}
            min={0}
            step={1}
            defaultValue={characterIndex}
            setter={(value) => setter(CharacterKeyMap[parseInt(value)])}
            captions={Object.keys(CharacterKeyMap).map((key, i, arr) => {
              if (i === 0 || i === arr.length - 1)
                return CharacterKeyMap[parseInt(key)];
              else return "";
            })}
          ></RangeBar>
        </div>
      </div>
      <h5 className="text-center text-lg mt-5">
        {CharacterKeyMap[characterIndex]}
      </h5>
    </>
  );
}
