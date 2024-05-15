import { render } from "@testing-library/react";
import BasketItem from "../BasketItem";
import { ICart } from "../../../interfaces/Cart/cart.interface";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();

describe("BasketItem", () => {
  const item: ICart = {
    id: "1",
    name: "Test Product",
    price: "99.99",
    quantity: 2,
  };

  it("renders the item name", () => {
    const store = mockStore({});
    const { getByText } = render(
      <Provider store={store}>
        <BasketItem item={item} />
      </Provider>
    );
    expect(getByText("Test Product")).toBeInTheDocument();
  });

  it("renders the item price", () => {
    const store = mockStore({});
    const { getByText } = render(
      <Provider store={store}>
        <BasketItem item={item} />
      </Provider>
    );
    expect(getByText("99.99 ₺")).toBeInTheDocument();
  });

  it("renders the Counter component with correct quantity", () => {
    const store = mockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <BasketItem item={item} />
      </Provider>
    );
    const counterQuantityComponent = getByTestId("counter-quantity");
    expect(counterQuantityComponent).toHaveAttribute("data-quantity", "2");
  });

  it("truncates long item names", () => {
    const longName =
      "This is a very long product name that should be truncated";
    const store = mockStore({});
    const { getByText } = render(
      <Provider store={store}>
        <BasketItem item={{ ...item, name: longName }} />
      </Provider>
    );
    const truncatedName = getByText(longName);
    expect(truncatedName).toHaveClass("truncate");
  });
});
