import { createSlice } from "@reduxjs/toolkit";
import { CategoriesType } from "../../types/types";


const initialState: { categories: CategoriesType | null} = {
  categories: null,
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
