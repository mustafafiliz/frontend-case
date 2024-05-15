import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Listing from "../Listing";
import { IProduct } from "../../../interfaces/Products/product.interface";

const mockStore = configureStore();

const mockData: IProduct[] = [
  {
    id: "1",
    name: "Product 1",
    price: "9.99",
    description: "This is product 1",
    image: "https://example.com/product1.jpg",
    createdAt: new Date(),
    model: "Model 1",
    brand: "Brand 1",
  },
  {
    id: "2",
    name: "Product 2",
    price: "19.99",
    description: "This is product 2",
    image: "https://example.com/product2.jpg",
    createdAt: new Date(),
    model: "Model 2",
    brand: "Brand 2",
  },
];

describe("Listing", () => {
  it("renders product cards when data is provided", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router>
          <Listing
            loading={false}
            data={mockData}
            currentPage={1}
            totalPages={1}
            onPagination={jest.fn()}
            limit={2}
          />
        </Router>
      </Provider>
    );

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(2);
  });

  it("renders skeletons when loading is true", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router>
          <Listing
            loading={true}
            data={[]}
            currentPage={1}
            totalPages={1}
            onPagination={jest.fn()}
            limit={3}
          />
        </Router>
      </Provider>
    );

    const skeletons = screen.getAllByTestId("product-card-skeleton");
    expect(skeletons).toHaveLength(3);
  });

  it("renders pagination component", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router>
          <Listing
            loading={false}
            data={mockData}
            currentPage={1}
            totalPages={2}
            onPagination={jest.fn()}
            limit={2}
          />
        </Router>
      </Provider>
    );

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });
});
