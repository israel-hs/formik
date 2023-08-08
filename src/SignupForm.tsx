import { Formik, Field, Form, ErrorMessage } from "formik";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }
  return errors;
};

export default function SigunpForm() {
  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        color: "red",
      }}
      validate={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#eee",
          }}
        >
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" />
          </div>
          <div>
            <label htmlFor="color">Choose a color</label>
            <Field name="color" as="select">
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </Field>
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
