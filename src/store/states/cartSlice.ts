import { createSlice } from "@reduxjs/toolkit";
import { CartsType } from "../../types/types";

const initialState: { carts: CartsType | null } = {
  carts: null,
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCarts(state, action) {
      state.carts = action.payload;
    },
  },
});

export const cartsActions = cartsSlice.actions;
export default cartsSlice;
