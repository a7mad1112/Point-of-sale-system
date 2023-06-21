import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './states/categoriesSlice';
import measuresSlice from './states/measuresSlice';

const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    measures: measuresSlice.reducer
  },
});
export default store;
