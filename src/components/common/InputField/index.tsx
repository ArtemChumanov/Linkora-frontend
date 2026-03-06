import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FC } from "react";

interface InputFieldProps {
  label: string;
  onChange: (arg: string) => void;
  value: string;
  errorText?: string;
  placeholder?: string;
}

const InputField: FC<InputFieldProps> = ({
  label,
  onChange,
  value,
  errorText,
  placeholder,
}) => {
  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) =>
    onChange(target.value);
  return (
    <Field>
      <FieldLabel htmlFor="input-field-username">{label}</FieldLabel>
      <Input
        id="input-field-username"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
      />
      {errorText && <FieldError>{errorText}</FieldError>}
    </Field>
  );
};

export default InputField;
