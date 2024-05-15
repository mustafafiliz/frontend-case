import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductCard from "../ProductCard";

const mockStore = configureStore();

const mockProduct = {
  id: "1",
  name: "Test Product",
  price: "999",
  description: "This is a test product",
  image: "https://example.com/product.jpg",
  createdAt: new Date(),
  model: "Test Model",
  brand: "Test Brand",
};

describe("ProductCard", () => {
  it("renders the product name", () => {
    const store = mockStore({});
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ProductCard item={mockProduct} />
        </Router>
      </Provider>
    );
    const productName = getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();
  });

  it("renders the product price", () => {
    const store = mockStore({});
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ProductCard item={mockProduct} />
        </Router>
      </Provider>
    );
    const productPrice = getByText(`${mockProduct.price} ₺`);
    expect(productPrice).toBeInTheDocument();
  });

  it("renders the product image", () => {
    const store = mockStore({});
    const { getByAltText } = render(
      <Provider store={store}>
        <Router>
          <ProductCard item={mockProduct} />
        </Router>
      </Provider>
    );
    const productImage = getByAltText(mockProduct.name);
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute("src", mockProduct.image);
  });

  it("renders the AddToCartButton component", () => {
    const store = mockStore({});
    const { getByRole } = render(
      <Provider store={store}>
        <Router>
          <ProductCard item={mockProduct} />
        </Router>
      </Provider>
    );
    const addToCartButton = getByRole("button", { name: "Add to Cart" });
    expect(addToCartButton).toBeInTheDocument();
  });

  it("renders a link to the product detail page", () => {
    const store = mockStore({});
    const { getByRole } = render(
      <Provider store={store}>
        <Router>
          <ProductCard item={mockProduct} />
        </Router>
      </Provider>
    );
    const productLink = getByRole("link", { name: "" });
    expect(productLink).toHaveAttribute("href", `/detail?id=${mockProduct.id}`);
  });
});
