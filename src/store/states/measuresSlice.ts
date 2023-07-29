import { createSlice } from "@reduxjs/toolkit";
import { MeasuresType } from "../../types/types";


const initialState: { measures: MeasuresType | null } = {
  measures: null,
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
