import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Basket from "../Basket";

const mockStore = configureStore();

describe("Basket", () => {
  it("renders 'Your cart is empty' when cart is empty", () => {
    const store = mockStore({ cart: [], totalCartPrice: 0 });
    const { getByText } = render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );
    expect(getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("renders basket items when cart is not empty", () => {
    const cartItems = [
      { id: "1", name: "Item 1", price: "10", quantity: 1 },
      { id: "2", name: "Item 2", price: "20", quantity: 2 },
    ];
    const store = mockStore({ cart: cartItems, totalCartPrice: 50 });
    const { getAllByTestId } = render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );
    const basketItems = getAllByTestId("basket-item");
    expect(basketItems).toHaveLength(cartItems.length);
  });

  it("renders total cart price correctly", () => {
    const cartItems = [
      { id: "1", name: "Item 1", price: "10", quantity: 1 },
      { id: "2", name: "Item 2", price: "20", quantity: 2 },
    ];
    const totalCartPrice = 50;
    const store = mockStore({ cart: cartItems, totalCartPrice });
    const { getByRole } = render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );
    const totalPriceHeading = getByRole("heading", { name: /Total Price/i });
    expect(totalPriceHeading).toBeInTheDocument();
    const totalPriceSpan = getByRole("heading", {
      name: /Total Price/i,
    }).querySelector("span");
    expect(totalPriceSpan).toHaveTextContent(`${totalCartPrice} ₺`);
  });
});
