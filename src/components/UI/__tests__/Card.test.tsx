import { render } from "@testing-library/react";
import Card from "../Card";

describe("Card", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Card>
        <div>Child Content</div>
      </Card>
    );
    expect(getByText("Child Content")).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    const { getByText } = render(<Card title="Card Title">Content</Card>);
    expect(getByText("Card Title")).toBeInTheDocument();
  });

  it("applies the provided className", () => {
    const { getByTestId } = render(
      <Card className="custom-class">Content</Card>
    );
    const element = getByTestId("card");
    expect(element).toHaveClass("custom-class");
  });

  it("applies the correct padding for size='sm'", () => {
    const { getByTestId } = render(
      <Card size="sm" className="custom-class">
        Content
      </Card>
    );
    const element = getByTestId("card");
    expect(element).toHaveClass("p-2.5");
  });

  it("applies the correct padding for size='md'", () => {
    const { getByTestId } = render(<Card size="md">Content</Card>);
    const element = getByTestId("card");
    expect(element).toHaveClass("p-[15px]");
  });

  it("applies the correct background and shadow styles", () => {
    const { getByTestId } = render(<Card>Content</Card>);
    const element = getByTestId("card");
    expect(element).toHaveClass("bg-white shadow-sm");
  });
});
