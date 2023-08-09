import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import SignupForm from "./SignupForm";

describe("SignupForm", () => {
  test("send expected data on submit & button is disabled accordingly", async () => {
    const onSubmit = jest.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    expect(screen.getByText("First Name")).toBeVisible();

    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.type(
      screen.getByRole("textbox", { name: /first name/i }),
      "Israel"
    );
    await user.type(
      screen.getByRole("textbox", { name: /last name/i }),
      "Romero"
    );
    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "israel@gmail.com"
    );

    await user.click(submitButton);
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: "Israel",
        lastName: "Romero",
        color: "red",
        email: "israel@gmail.com",
      });
    });
    expect(screen.getByRole("button", { name: /submit/i })).not.toBeDisabled();
  });

  test("shows expected error texts when form data is missing", async () => {
    const onSubmit = jest.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(
      screen.getByRole("textbox", { name: /first name/i }),
      "Israel"
    );
    await user.click(screen.getByRole("button", { name: /submit/i }));
    expect(screen.getAllByText(/required/i)[0]).toBeVisible();
    expect(screen.getByText(/email required/i)).toBeVisible();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(screen.getByRole("textbox", { name: /email/i }), "israel");
    expect(screen.getByText(/invalid email/i)).toBeVisible();
  });
});
