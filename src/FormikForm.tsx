import style from "styled-components";
import { Select } from "@helloself/hello-self-ui";
import { Formik, Field, Form, ErrorMessage } from "formik";

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ email: "", color: "red" }}
      validate={(values) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        console.log("Submitting...");
        setTimeout(() => {
          console.log("submitted!!");
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component={StyledDiv} />
          <Select
            name="color"
            value={values.color}
            onChange={(values) => {
              console.log({ values });
              setFieldValue("color", values);
            }}
          >
            <Select.Option value="red">Red</Select.Option>
            <Select.Option value="green">Green</Select.Option>
            <Select.Option value="blue">Blue</Select.Option>
          </Select>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

const StyledDiv = style.div`
  background-color: red;
`;
