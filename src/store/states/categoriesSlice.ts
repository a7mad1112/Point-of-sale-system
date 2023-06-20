import { createSlice } from "@reduxjs/toolkit";

type Category = {
  id: number;
  name: string;
  image?: string;
};
type Categories = Category[];

const initialState: { categories: Categories } = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const categoryActions = categoriesSlice.actions;
export default categoriesSlice;
