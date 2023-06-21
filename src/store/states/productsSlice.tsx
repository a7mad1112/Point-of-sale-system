import { createSlice } from "@reduxjs/toolkit";
import { Products } from "../../types/types";


const initialState: { products: Products } = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice;
