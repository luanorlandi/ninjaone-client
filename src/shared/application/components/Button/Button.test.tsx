import { render, screen, userEvent } from "@/testUtils";

import { Button } from "./Button";

describe("Button component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
  });

  it("renders correctly when loading", () => {
    render(<Button loading>Click me</Button>);

    const spinner = screen.getByLabelText("Loading icon");

    expect(spinner).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
