import style from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ email: "" }}
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
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component={StyledDiv} />
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
