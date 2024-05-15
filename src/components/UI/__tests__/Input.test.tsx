import { render, fireEvent } from "@testing-library/react";
import Input from "../Input";

describe("Input", () => {
  it("renders the input with the correct placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input value="" onChange={() => {}} />
    );
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders the input with the correct value", () => {
    const { getByDisplayValue } = render(
      <Input value="test value" onChange={() => {}} />
    );
    expect(getByDisplayValue("test value")).toBeInTheDocument();
  });

  it("calls the onChange function when the input value changes", () => {
    const onChange = jest.fn();
    const { getByDisplayValue } = render(
      <Input value="initial value" onChange={onChange} />
    );
    const input = getByDisplayValue("initial value");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(onChange).toHaveBeenCalledWith("new value");
  });

  it("calls the onSubmit function when the search button is clicked", () => {
    const onSubmit = jest.fn();
    const { getByRole } = render(
      <Input value="" onChange={() => {}} onSubmit={onSubmit} />
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
  });

  it("renders the input with the correct size", () => {
    const { getByDisplayValue } = render(
      <Input value="test value" onChange={() => {}} size="sm" />
    );
    const input = getByDisplayValue("test value");
    expect(input).toHaveClass("text-sm");
  });

  it("renders the input with the correct variant", () => {
    const { getByDisplayValue } = render(
      <Input value="test value" onChange={() => {}} variant="dark" />
    );
    const input = getByDisplayValue("test value");
    expect(input.parentElement).toHaveClass("bg-[#fafafb]");
  });
});
