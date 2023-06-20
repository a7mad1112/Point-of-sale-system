import { createSlice } from "@reduxjs/toolkit";

type Category = {
  id: number;
  name: string;
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
    addItem(state, action) {
      const newItem = action.payload;
      state.categories.push({
        id: newItem.id,
        name: newItem.name,
      });
    },
    // ===== delete item ======
    deleteItem(state, action) {
      const id = action.payload;
      state.categories = state.categories.filter(
        (item: Category) => item.id !== id
      );
    },
    // ====== update item ======
    updateItem(state, action) {
      const newItem: Category = action.payload;
      state.categories.forEach((item: Category) => {
        if (newItem.id === item.id) item.name = newItem.name;
      });
    },
  },
});

export const categoryActions = categoriesSlice.actions;
export default categoriesSlice;
