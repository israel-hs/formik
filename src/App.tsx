import SigunpForm from "./SignupForm";
import FormikForm from "./FormikForm";

import "./App.css";

function App() {
  return <SigunpForm onSubmit={console.log} />;
  // return <FormikForm />;
}

export default App;
