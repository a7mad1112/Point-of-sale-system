import { createSlice } from "@reduxjs/toolkit";
import { MeasuresType } from "../../types/types";


const initialState: { measures: MeasuresType } = {
  measures: [],
};

const measuresSlice = createSlice({
  name: "measures",
  initialState,
  reducers: {
    setMeasures(state, action) {
      state.measures = action.payload;
    },
  },
});

export const measuresActions = measuresSlice.actions;
export default measuresSlice;
