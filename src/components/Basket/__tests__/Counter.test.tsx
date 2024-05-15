import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Counter from "../Counter";

const mockStore = configureStore();

describe("Counter", () => {
  it("renders the correct initial quantity", () => {
    const store = mockStore({});
    const initialQuantity = 3;
    const { getByTestId } = render(
      <Provider store={store}>
        <Counter quantity={initialQuantity} id="1" />
      </Provider>
    );
    const quantitySpan = getByTestId("counter-quantity");
    expect(quantitySpan).toHaveAttribute("data-quantity", `${initialQuantity}`);
    expect(quantitySpan).toHaveTextContent(`${initialQuantity}`);
  });

  it("decreases the quantity when the minus button is clicked", () => {
    const store = mockStore({});
    const initialQuantity = 3;
    const { getByTestId } = render(
      <Provider store={store}>
        <Counter quantity={initialQuantity} id="1" />
      </Provider>
    );
    const minusButton = getByTestId("counter-minus");
    fireEvent.click(minusButton);
    const quantitySpan = getByTestId("counter-quantity");
    expect(quantitySpan).toHaveAttribute(
      "data-quantity",
      `${initialQuantity - 1}`
    );
    expect(quantitySpan).toHaveTextContent(`${initialQuantity - 1}`);
  });

  it("increases the quantity when the plus button is clicked", () => {
    const store = mockStore({});
    const initialQuantity = 3;
    const { getByTestId } = render(
      <Provider store={store}>
        <Counter quantity={initialQuantity} id="1" />
      </Provider>
    );
    const plusButton = getByTestId("counter-plus");
    fireEvent.click(plusButton);
    const quantitySpan = getByTestId("counter-quantity");
    expect(quantitySpan).toHaveAttribute(
      "data-quantity",
      `${initialQuantity + 1}`
    );
    expect(quantitySpan).toHaveTextContent(`${initialQuantity + 1}`);
  });

  it("dispatches the correct actions when the buttons are clicked", () => {
    const store = mockStore({});
    const initialQuantity = 3;
    const { getByTestId } = render(
      <Provider store={store}>
        <Counter quantity={initialQuantity} id="1" />
      </Provider>
    );
    const minusButton = getByTestId("counter-minus");
    const plusButton = getByTestId("counter-plus");
    fireEvent.click(minusButton);
    fireEvent.click(plusButton);
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe("app/decreaseQuantity");
    expect(actions[0].payload).toBe("1");
    expect(actions[1].type).toBe("app/increaseQuantity");
    expect(actions[1].payload).toBe("1");
  });
});
