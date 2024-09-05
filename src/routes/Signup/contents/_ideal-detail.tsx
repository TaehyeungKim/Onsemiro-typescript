import { useCallback, useState, useEffect, useContext } from "react";
import { IdealChoiceDataSetProps } from "./type";
import {
  DoubleThumbRangeBar,
  SelectionRadioGrid,
} from "@/components/CustomInput";
import { IdealChoiceSetContext } from "@/layout/SignUpRelated";
import {
  AppearanceCollection,
  Bdsm,
  CITYSET,
  DEFAULT_CHARACTER_VALUE,
  DEFAULT_MBTI_VALUE,
  EyelidCollection,
  WeightCollection,
} from "@/assets/const";
import {
  MBTISettingSection,
  CharacterSettingSection,
  SelectRegions,
} from "./shared";

export function IdealAgeSetting({ reqType, data }: IdealChoiceDataSetProps) {
  const [MIN, MAX] = [20, 29];
  const adjustAgeData = useCallback((age: number) => {
    if (age === 29) return age + 1;
    if (age === 30) return age - 1;
    return age;
  }, []);

  const [ageMin, setAgeMin] = useState(() => {
    const d = data.preference[reqType]?.age?.age_min;
    if (d) return adjustAgeData(d);
    return MIN;
  });
  const [ageMax, setAgeMax] = useState(() => {
    const d = data.preference[reqType]?.age?.age_max;
    if (d) return adjustAgeData(d);
    return MAX;
  });

  const { setter: dataSetter } = useContext(IdealChoiceSetContext);

  useEffect(() => {
    if (ageMin && ageMax)
      dataSetter &&
        dataSetter({
          age: {
            age_min: ageMin,
            age_max: ageMax,
          },
        });
  }, [ageMin, ageMax]);

  return (
    <>
      <DoubleThumbRangeBar
        min={MIN}
        max={MAX}
        step={3}
        captions={(() => {
          const arr = [];
          for (let i = MIN; i < MAX; i += 3) arr.push(i);
          arr.push(30);
          return arr;
        })()}
        setter={{ setSmaller: setAgeMin, setBigger: setAgeMax }}
        defaultValue={{
          min: ageMin,
          max: ageMax,
        }}
      ></DoubleThumbRangeBar>
      <h5 className="text-center text-lg mt-10">
        {adjustAgeData(ageMin)}세 이상 {adjustAgeData(ageMax)}세 이하
      </h5>
    </>
  );
}

export function IdealBDSMSetting({ reqType, data }: IdealChoiceDataSetProps) {
  const [bdsm, setBdsm] = useState(data.preference[reqType]?.bdsm ?? "");
  const { setter: dataSetter } = useContext(IdealChoiceSetContext);

  useEffect(() => {
    if (bdsm)
      dataSetter &&
        dataSetter({
          bdsm,
        });
  }, [bdsm]);

  return (
    <SelectionRadioGrid
      collection={Bdsm}
      name="bdsm"
      setter={(s) => setBdsm(s)}
      defaultV={bdsm}
    ></SelectionRadioGrid>
  );
}

export function IdealHeightSetting({
  reqType,

  data,
}: IdealChoiceDataSetProps) {
  const [MIN, MAX] = [145, 190];

  const [heightMin, setHeightMin] = useState(
    data.preference[reqType]?.height?.height_min ?? MIN
  );
  const [heightMax, setHeightMax] = useState(
    data.preference[reqType]?.height?.height_max ?? MAX
  );

  const { setter: dataSetter } = useContext(IdealChoiceSetContext);

  useEffect(() => {
    if (heightMin && heightMax)
      dataSetter &&
        dataSetter({
          height: {
            height_min: heightMin,
            height_max: heightMax,
          },
        });
  }, [heightMin, heightMax]);

  return (
    <>
      <DoubleThumbRangeBar
        min={145}
        max={190}
        step={5}
        captions={[
          "",
          ...(() => {
            const arr = [];
            for (let i = MIN + 5; i < MAX; i += 5) arr.push(i);
            return arr;
          })(),
          "",
        ]}
        setter={{ setSmaller: setHeightMin, setBigger: setHeightMax }}
        defaultValue={{
          min: heightMin,
          max: heightMax,
        }}
      ></DoubleThumbRangeBar>
      <h5 className="text-center mt-9 text-lg">
        {heightMin === MIN && heightMax === MAX ? (
          <>키 상관 없음</>
        ) : (
          <>
            {heightMin === MIN ? "" : `${heightMin}이상 `}
            {heightMax === MAX ? "" : `${heightMax}이하`}
          </>
        )}
      </h5>
    </>
  );
}

export function IdealWeightSetting({
  reqType,

  data,
}: IdealChoiceDataSetProps) {
  const [weight, setWeight] = useState(data.preference[reqType]?.weight ?? "");

  const { setter: dataSetter } = useContext(IdealChoiceSetContext);

  useEffect(() => {
    if (weight)
      dataSetter &&
        dataSetter({
          weight,
        });
  }, [weight]);

  return (
    <>
      <SelectionRadioGrid
        collection={WeightCollection}
        name="weight"
        setter={(w) => setWeight(w)}
        defaultV={weight}
      ></SelectionRadioGrid>
    </>
  );
}

export function IdealAppearanceSetting({
  reqType,
  data,
}: IdealChoiceDataSetProps) {
  const [appearance, setAppearance] = useState(
    data.preference[reqType]?.appearance ?? ""
  );

  const { setter: dataSetter } = useContext(IdealChoiceSetContext);

  useEffect(() => {
    if (appearance) dataSetter && dataSetter({ appearance });
  }, [appearance]);

  return (
    <>
      <SelectionRadioGrid
        collection={AppearanceCollection}
        name="appearance"
        setter={(app) => setAppearance(app)}
        defaultV={appearance}
      ></SelectionRadioGrid>
    </>
  );
}

export function IdealEyelidSetting({ reqType, data }: IdealChoiceDataSetProps) {
  const [eyelid, setEyelid] = useState(data.preference[reqType]?.eyelid ?? "");

  const { setter: dataSetter } = useContext(IdealChoiceSetContext);

  useEffect(() => {
    if (eyelid) dataSetter && dataSetter({ eyelid });
  }, [eyelid]);

  return (
    <>
      <SelectionRadioGrid
        collection={EyelidCollection}
        name="eyelid"
        setter={(eye) => setEyelid(eye)}
        defaultV={eyelid}
      ></SelectionRadioGrid>
    </>
  );
}

export function IdealMBTISetting({ reqType, data }: IdealChoiceDataSetProps) {
  const [mbti, setMBTI] = useState(
    data.preference[reqType]?.mbti ??
      `${DEFAULT_MBTI_VALUE.first}${DEFAULT_MBTI_VALUE.second}${DEFAULT_MBTI_VALUE.third}${DEFAULT_MBTI_VALUE.fourth}`
  );

  const { setter: dataSetter } = useContext(IdealChoiceSetContext);

  useEffect(() => {
    if (mbti) dataSetter && dataSetter({ mbti });
  }, [mbti]);

  return (
    <>
      <MBTISettingSection mbti={mbti} setter={setMBTI} />
    </>
  );
}

export function IdealCharacterSetting({
  reqType,
  data,
}: IdealChoiceDataSetProps) {
  const [character, setCharacter] = useState(
    data.preference[reqType]?.character ?? DEFAULT_CHARACTER_VALUE
  );

  const { setter: dataSetter } = useContext(IdealChoiceSetContext);

  useEffect(() => {
    if (character) dataSetter && dataSetter({ character });
  }, [character]);

  return (
    <>
      <CharacterSettingSection
        character={character}
        setter={(character) => setCharacter(character)}
      />
    </>
  );
}

export function IdealLocationSetting({
  reqType,
  data,
}: IdealChoiceDataSetProps) {
  const [city, setCity] = useState(
    data.preference[reqType]?.location?.city ?? ""
  );
  const [sub, setSub] = useState(
    data.preference[reqType]?.location?.subRegion ?? ""
  );

  const { setter: dataSetter } = useContext(IdealChoiceSetContext);

  useEffect(() => {
    return () => setSub("");
  }, [city]);

  useEffect(() => {
    if (city && sub) {
      dataSetter &&
        dataSetter({
          location: {
            city,
            subRegion: sub,
          },
        });
    }
    return () => {
      dataSetter && dataSetter(undefined);
    };
  }, [city, sub]);

  return (
    <>
      <SelectRegions
        set={CITYSET}
        setter={{
          city: (city) => setCity(city),
          sub: (sub) => setSub(sub),
        }}
        selected={{
          city,
          sub,
        }}
      ></SelectRegions>
    </>
  );
}
