import {
  CustomTextInputProps,
  RangeBarProps,
  SelectionRadioGridProps,
} from "./type";

export function CustomTextInput({
  id,
  placeholder,
  label = "",
  ...props
}: CustomTextInputProps) {
  return (
    <div className="relative h-10 flex items-center rounded-lg grow">
      {label && (
        <label htmlFor={id} className="block mr-5">
          {label}
        </label>
      )}

      <div className="grow h-full bg-input rounded-lg overflow-hidden">
        <input
          className="h-full w-full block text-xs pl-3 box-border"
          placeholder={placeholder}
          id={id}
          {...props}
        ></input>
      </div>
    </div>
  );
}

export function SelectionRadioGrid({
  collection,
  name,
  setter,
  defaultV,
}: SelectionRadioGridProps) {
  return (
    <div className="grid grid-cols-2 gap-5 w-5/6 mx-auto mt-10 mb-5">
      {collection.map((value, i) => {
        return (
          <div
            key={i}
            className="relative mx-auto w-full rounded-lg overflow-hidden shadow-xl"
          >
            <input
              type="radio"
              hidden
              value={value.main}
              id={value.main}
              className="peer"
              name={name}
              onChange={(e) => setter(e.target.value)}
              defaultChecked={defaultV === value.main ? true : false}
            />
            <label
              htmlFor={value.main}
              className="block bg-input py-2 peer-checked:bg-main"
            >
              <div className="text-center">
                <h6>{value.main}</h6>
                {value.sub ? <p>{value.sub}</p> : null}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
}

export function RangeBar({
  max,
  min,
  step,
  defaultValue,
  setter,
  captions,
  options = null,
}: RangeBarProps) {
  return (
    <div className={`w-full h-4 mx-auto relative flex items-center `}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        className={`w-full block absolute top-0 left-0 h-full z-10`}
        defaultValue={defaultValue}
        onChange={(e) => setter(e.target.value)}
      ></input>
      <div
        className={`h-1 w-full bg-main 
          ${options?.bgStyle?.reduce(
            (prev: string, cur: string) => `${prev} ` + cur
          )}
        `}
      >
        <div className="flex justify-between w-full h-full absolute top-0 items-center">
          {captions?.map((caption, i) => (
            <div
              key={i}
              className={`bg-main rounded-full w-3 aspect-square flex justify-center ${options?.captionCircleStyle?.reduce(
                (prev: string, cur: string) => `${prev} ` + `${cur}`
              )}`}
            >
              <p className="h-0 overflow-visible -translate-y-7 text-center whitespace-nowrap w-fit">
                {caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
