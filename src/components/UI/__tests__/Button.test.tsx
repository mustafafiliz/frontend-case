import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("renders the button with the correct name", () => {
    const { getByText } = render(<Button name="Click Me" />);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it("applies the provided className", () => {
    const { getByText } = render(
      <Button name="Click Me" className="custom-class" />
    );
    expect(getByText("Click Me")).toHaveClass("custom-class");
  });

  it("calls the onClick function when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button name="Click Me" onClick={handleClick} />
    );
    fireEvent.click(getByText("Click Me"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("disables the button when disabled prop is true", () => {
    const { getByText } = render(<Button name="Click Me" disabled />);
    expect(getByText("Click Me")).toBeDisabled();
  });

  it("applies the correct background color when disabled", () => {
    const { getByText } = render(<Button name="Click Me" disabled />);
    expect(getByText("Click Me")).toHaveClass("bg-gray-400");
  });

  it("applies the correct background color when not disabled", () => {
    const { getByText } = render(<Button name="Click Me" />);
    expect(getByText("Click Me")).toHaveClass("bg-primary-500");
  });
});
