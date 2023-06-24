import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../../types/types";

const initialState: { cartProducts: CartProduct [] } = {
  cartProducts: [],
};

const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    setCartProducts(state, action) {
      state.cartProducts = action.payload;
    },
  },
});

export const cartProductsActions = cartProductsSlice.actions;
export default cartProductsSlice;
