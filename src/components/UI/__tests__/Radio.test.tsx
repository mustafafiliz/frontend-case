import { render, fireEvent } from "@testing-library/react";
import Radio from "../Radio";

describe("Radio", () => {
  it("renders the label correctly", () => {
    const { getByText } = render(
      <Radio label="Label Text" checked={false} onChange={() => {}} />
    );
    expect(getByText("Label Text")).toBeInTheDocument();
  });

  it("applies the correct styles when checked", () => {
    const { getByTestId } = render(
      <Radio label="Label Text" checked={true} onChange={() => {}} />
    );
    const radioButton = getByTestId("radio-button");
    expect(radioButton).toHaveClass("bg-primary-500");
  });

  it("applies the correct styles when unchecked", () => {
    const { getByTestId } = render(
      <Radio label="Label Text" checked={false} onChange={() => {}} />
    );
    const radioButton = getByTestId("radio-button");
    expect(radioButton).toHaveClass("bg-transparent");
  });

  it("calls the onChange function when clicked", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <Radio label="Label Text" checked={false} onChange={handleChange} />
    );
    const radioContainer = getByTestId("radio-container");
    fireEvent.click(radioContainer);
    expect(handleChange).toHaveBeenCalled();
  });
});
