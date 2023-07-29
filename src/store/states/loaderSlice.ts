import { createSlice } from "@reduxjs/toolkit";

const initialState: { isLoading: Boolean } = {
  isLoading: true,
};

const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = Boolean(action.payload);
    },
  },
});

export const isLoadingActions = isLoadingSlice.actions;
export default isLoadingSlice;
