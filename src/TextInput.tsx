import { ErrorMessage, Field, useField } from "formik";
import { ErrorDiv } from "./styled";

export function TextInput({ label, ...props }: any) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField<{ email: string }>(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? meta.error : null}
    </div>
  );
}

interface BetterTextInputProps {
  label: string;
  id: string;
  name: string;
  type?: "text" | "email" | "password";
}

export function BetterTextInput({
  label,
  id,
  name,
  type = "text",
}: BetterTextInputProps) {
  return (
    <div style={{ display: "flex" }}>
      <label htmlFor={id}>{label}</label>
      <Field id={name} name={name} type={type} />
      <ErrorMessage name={name} component={ErrorDiv} />
    </div>
  );
}
