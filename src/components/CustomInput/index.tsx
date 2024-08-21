import { CustomTextInputProps } from "./type";

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
