import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../../interfaces/Cart/cart.interface";

export interface AppInitialState {
  cart: ICart[];
  totalCartPrice: number;
}
const initialState: AppInitialState = {
  cart: [],
  totalCartPrice: 0,
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICart>) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
      state.totalCartPrice = calculateTotalPrice(state.cart);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === productId
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += 1;
      }
      state.totalCartPrice = calculateTotalPrice(state.cart);
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === productId
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity -= 1;

        if (state.cart[existingProductIndex].quantity === 0) {
          state.cart.splice(existingProductIndex, 1);
        }
      }
      state.totalCartPrice = calculateTotalPrice(state.cart);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity } =
  appSlice.actions;
export default appSlice.reducer;

export const selectCart = (state: AppInitialState) => state.cart;
export const selectTotalCartPrice = (state: AppInitialState) =>
  state.totalCartPrice;

const calculateTotalPrice = (cart: ICart[]) => {
  let totalPrice = 0;

  cart.forEach((item) => {
    const itemTotalPrice = parseFloat(item.price) * item.quantity;
    totalPrice += itemTotalPrice;
  });

  return totalPrice;
};
