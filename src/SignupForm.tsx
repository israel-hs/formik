import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikHelpers,
  // FormikErrors,
} from "formik";
import * as Yup from "yup";
import { ErrorDiv } from "./styled";
import { TextInput, BetterTextInput } from "./TextInput";

interface Values {
  email: string;
  firstName: string;
  lastName: string;
  color: string;
}

interface SignupFormProps {
  onSubmit: (values: Values) => void;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("First name required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Last name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
});

// const validate = (values: Values) => {
//   const errors: FormikErrors<Values> = {};
//   if (!values.firstName) {
//     errors.firstName = "Required";
//   } else if (values.firstName.length > 15) {
//     errors.firstName = "Must be 15 characters or less";
//   }

//   if (!values.lastName) {
//     errors.lastName = "Required";
//   } else if (values.lastName.length > 20) {
//     errors.lastName = "Must be 20 characters or less";
//   }

//   return errors;
// };

export default function SigunpForm({ onSubmit }: SignupFormProps) {
  const initialValues: Values = {
    email: "",
    firstName: "",
    lastName: "",
    color: "red",
  };

  const handleSubmit = (values: Values, actions: FormikHelpers<Values>) => {
    setTimeout(() => {
      onSubmit(values);
      actions.setSubmitting(false);
    }, 500); // 500 ms should be enough for the test to pass, 1000 ms makes the test fail
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      // validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
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
            id="email"
            name="email"
            label="Email Address"
            placeholder="enter email"
          />
          <button
            style={{ background: "lightblue" }}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
