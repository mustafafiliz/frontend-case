import { render, fireEvent } from "@testing-library/react";
import Checkbox from "../Checkbox";

describe("Checkbox", () => {
  it("renders the label correctly", () => {
    const { getByText } = render(
      <Checkbox label="Label Text" checked={false} onClick={() => {}} />
    );
    expect(getByText("Label Text")).toBeInTheDocument();
  });

  it("applies the correct styles when checked", () => {
    const { getByTestId } = render(
      <Checkbox label="Label Text" checked={true} onClick={() => {}} />
    );
    const checkbox = getByTestId("checkbox");
    expect(checkbox).toHaveClass("bg-primary-500");
    const checkedIcon = getByTestId("checkbox-icon");
    expect(checkedIcon).toBeInTheDocument();
  });
  it("applies the correct styles when unchecked", () => {
    const { getByTestId, queryByTestId } = render(
      <Checkbox label="Label Text" checked={false} onClick={() => {}} />
    );
    const checkbox = getByTestId("checkbox");
    expect(checkbox).toHaveClass("bg-transparent");
    const checkedIcon = queryByTestId("checkbox-icon");
    expect(checkedIcon).toBeNull();
  });

  it("calls the onClick function when clicked", () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Checkbox label="Label Text" checked={false} onClick={handleClick} />
    );
    const checkbox = getByTestId("checkbox-container");
    fireEvent.click(checkbox);
    expect(handleClick).toHaveBeenCalled();
  });
});
