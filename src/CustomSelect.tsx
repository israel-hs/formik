import { FormikProps } from "formik";
import { Values } from "./SignupForm";
import { Select } from "@helloself/hello-self-ui";

interface CustomSelectProps extends FormikProps<Values> {
  label: string;
  name: string;
}

export const CustomSelect = ({
  label,
  name,
  values,
  setFieldValue,
}: CustomSelectProps) => (
  <div style={{ display: "flex", gap: "5px" }}>
    <label htmlFor={name}>{label}</label>
    <Select
      id={name}
      name={name}
      value={values.color}
      onChange={(value) => setFieldValue("color", value)}
    >
      <Select.Option value="red">Red</Select.Option>
      <Select.Option value="green">Green</Select.Option>
      <Select.Option value="blue">Blue</Select.Option>
    </Select>
  </div>
);
