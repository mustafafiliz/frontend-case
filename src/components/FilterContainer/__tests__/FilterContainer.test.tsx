import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import FilterContainer, { labelSkeletonLimit } from "../FilterContainer";
import { sorts } from "../../../mocks/static";

const mockStore = configureStore();

const facets = {
  models: ["Model A", "Model B", "Model C"],
  brands: ["Brand X", "Brand Y", "Brand Z"],
  selectedModels: [],
  selectedBrands: [],
};

const changeFacetsMock = jest.fn();
const setSortByMock = jest.fn();

describe("FilterContainer", () => {
  it("renders the correct number of sort options", () => {
    const store = mockStore({});
    const { getAllByTestId } = render(
      <Provider store={store}>
        <Router>
          <FilterContainer
            facets={facets}
            loading={false}
            changeFacets={changeFacetsMock}
            sortBy=""
            setSortBy={setSortByMock}
          />
        </Router>
      </Provider>
    );
    const sortOptions = getAllByTestId("radio-container");
    expect(sortOptions).toHaveLength(sorts.length);
  });

  it("filters brands correctly when searching", () => {
    const store = mockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <FilterContainer
            facets={facets}
            loading={false}
            changeFacets={changeFacetsMock}
            sortBy=""
            setSortBy={setSortByMock}
          />
        </Router>
      </Provider>
    );
    const brandInput = getByTestId("search-brands");
    fireEvent.change(brandInput, { target: { value: "X" } });
    const brandsContainer = getByTestId("brands-container");
    const brandCheckboxes = brandsContainer.querySelectorAll(
      "[data-testid='checkbox-container']"
    );
    expect(brandCheckboxes).toHaveLength(1);
    expect(brandCheckboxes[0]).toHaveTextContent("Brand X");
  });

  it("filters models correctly when searching", () => {
    const store = mockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <FilterContainer
            facets={facets}
            loading={false}
            changeFacets={changeFacetsMock}
            sortBy=""
            setSortBy={setSortByMock}
          />
        </Router>
      </Provider>
    );

    const modelInput = getByTestId("search-models");
    fireEvent.change(modelInput, { target: { value: "B" } });
    const modelsContainer = getByTestId("models-container");
    const modelCheckboxes = modelsContainer.querySelectorAll(
      "[data-testid='checkbox-container']"
    );
    expect(modelCheckboxes).toHaveLength(1);
    expect(modelCheckboxes[0]).toHaveTextContent("Model B");
  });

  it("renders loading skeletons when loading is true", () => {
    const store = mockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <FilterContainer
            facets={facets}
            loading={true}
            changeFacets={changeFacetsMock}
            sortBy=""
            setSortBy={setSortByMock}
          />
        </Router>
      </Provider>
    );
    const brandsContainer = getByTestId("brands-container");
    const modelsContainer = getByTestId("models-container");

    const brandSkeletons = brandsContainer.querySelectorAll(
      "[data-testid='filter-label-skeleton']"
    );
    const modelSkeletons = modelsContainer.querySelectorAll(
      "[data-testid='filter-label-skeleton']"
    );
    expect(brandSkeletons).toHaveLength(labelSkeletonLimit);
    expect(modelSkeletons).toHaveLength(labelSkeletonLimit);
  });
});
