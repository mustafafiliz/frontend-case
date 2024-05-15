import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../Header";

const mockStore = configureStore();

describe("Header", () => {
  it("updates the search query when input changes", () => {
    const store = mockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    const searchInput = getByTestId("header-search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput).toHaveValue("test");
  });
  it("navigates to the search page when form is submitted", () => {
    const store = mockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    const searchInput = getByTestId("header-search");
    const form = getByTestId("header-search-container");
    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.submit(form);
    expect(window.location.search).toBe("?q=test");
  });
});
