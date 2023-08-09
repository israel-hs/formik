import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikHelpers,
  FormikErrors,
} from "formik";
import { TextInput, BetterTextInput } from "./TextInput";
import { ErrorDiv } from "./styled";

interface Values {
  email: string;
  firstName: string;
  lastName: string;
  color: string;
}

const validate = (values: Values) => {
  const errors: FormikErrors<Values> = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  return errors;
};

interface SignupFormProps {
  onSubmit: (values: Values) => void;
}

export default function SigunpForm({ onSubmit }: SignupFormProps) {
  const initialValues: Values = {
    email: "",
    firstName: "",
    lastName: "",
    color: "red",
  };

  const handleSubmit = (values: Values, actions: FormikHelpers<Values>) => {
    actions.setSubmitting(false);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form
          style={{
            display: "flex",
            gap: "5px",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#eee",
          }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" type="text" />
            <ErrorMessage name="firstName" component={ErrorDiv} />
          </div>
          <BetterTextInput label="Last Name" name="lastName" />
          <div>
            <label htmlFor="color">Choose a color</label>
            <Field name="color" as="select">
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </Field>
          </div>
          <TextInput
            label="Email Address"
            name="email"
            placeholder="enter email"
          />
          <button style={{ background: "lightblue" }} type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
