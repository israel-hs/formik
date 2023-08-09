import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import SignupForm from "./SignupForm";

describe("SignupForm", () => {
  test("sends the right data on submit", async () => {
    const onSubmit = jest.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    expect(screen.getByText("First Name")).toBeVisible();

    const user = userEvent.setup();
    await user.type(
      screen.getByRole("textbox", { name: /first name/i }),
      "Israel"
    );
    await user.type(
      screen.getByRole("textbox", { name: /last name/i }),
      "Romero"
    );
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      firstName: "Israel",
      lastName: "Romero",
      color: "red",
      email: "",
    });
  });

  test("shows a Required text when either first name or last name are empty", async () => {
    const onSubmit = jest.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(
      screen.getByRole("textbox", { name: /first name/i }),
      "Israel"
    );
    await user.click(screen.getByRole("button", { name: /submit/i }));
    expect(screen.getByText(/required/i)).toBeVisible();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
