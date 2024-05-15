import { render } from "@testing-library/react";
import Container from "../Container";

describe("Container", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Container>
        <div>Child Content</div>
      </Container>
    );
    expect(getByText("Child Content")).toBeInTheDocument();
  });

  it("applies the provided className", () => {
    const { getByTestId } = render(
      <Container className="custom-class">
        <div data-testid="container-content">Content</div>
      </Container>
    );
    const element = getByTestId("container-content");
    expect(element.parentElement).toHaveClass("custom-class container mx-auto");
  });

  it("renders without className", () => {
    const { getByTestId } = render(
      <Container>
        <div data-testid="container-content">Content</div>
      </Container>
    );
    const element = getByTestId("container-content");
    expect(element.parentElement).toHaveClass("container mx-auto");
  });
});
