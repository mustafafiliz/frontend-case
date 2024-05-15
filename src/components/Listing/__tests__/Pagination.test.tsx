import { render, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination", () => {
  const onPaginationMock = jest.fn();

  it("calls onPagination with correct page number when button is clicked", () => {
    const { getByText } = render(
      <Pagination
        page={1}
        totalPages={5}
        onPagination={onPaginationMock}
        disabled={false}
      />
    );

    fireEvent.click(getByText("3"));
    expect(onPaginationMock).toHaveBeenCalledWith(3);
  });

  it("disables buttons when disabled prop is true", () => {
    const { getAllByRole } = render(
      <Pagination
        page={1}
        totalPages={5}
        onPagination={onPaginationMock}
        disabled={true}
      />
    );

    const buttons = getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("does not render pagination when totalPages is 1", () => {
    const { queryByTestId } = render(
      <Pagination
        page={1}
        totalPages={1}
        onPagination={onPaginationMock}
        disabled={false}
      />
    );

    expect(queryByTestId("pagination")).toBeNull();
  });
});
