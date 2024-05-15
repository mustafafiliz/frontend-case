import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddToCartButton from "../AddToCartButton";
import { IProduct } from "../../../interfaces/Products/product.interface";

const mockStore = configureStore();

describe("AddToCartButton", () => {
  const product: IProduct = {
    id: "1",
    name: "Test Product",
    price: "999",
    description: "This is a test product",
    image: "https://example.com/product.jpg",
    createdAt: new Date(),
    model: "Test Model",
    brand: "Test Brand",
  };

  it("renders the button with the correct initial text", () => {
    const store = mockStore({});
    const { getByRole } = render(
      <Provider store={store}>
        <AddToCartButton item={product} />
      </Provider>
    );
    const button = getByRole("button", { name: "Add to Cart" });
    expect(button).toBeInTheDocument();
  });

  it("updates the button text to 'Added' after clicking", () => {
    const store = mockStore({});
    const { getByRole } = render(
      <Provider store={store}>
        <AddToCartButton item={product} />
      </Provider>
    );
    const button = getByRole("button", { name: "Add to Cart" });
    fireEvent.click(button);
    expect(button).toHaveTextContent("Added");
  });

  it("disables the button while loading", () => {
    const store = mockStore({});
    const { getByRole } = render(
      <Provider store={store}>
        <AddToCartButton item={product} />
      </Provider>
    );
    const button = getByRole("button", { name: "Add to Cart" });
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  it("dispatches the addToCart action with correct payload", () => {
    const store = mockStore({});
    const { getByRole } = render(
      <Provider store={store}>
        <AddToCartButton item={product} />
      </Provider>
    );
    const button = getByRole("button", { name: "Add to Cart" });
    fireEvent.click(button);
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe("app/addToCart");
    expect(actions[0].payload).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  });
});
