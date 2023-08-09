import { render, screen } from "@testing-library/react";
import SignupForm from "./SignupForm";

test("SigupForm is rendered", () => {
  render(<SignupForm />);
  expect(screen.getByText("First Name")).toBeVisible();
});
