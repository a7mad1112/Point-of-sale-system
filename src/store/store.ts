import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './states/categoriesSlice';
import measuresSlice from './states/measuresSlice';
import productsSlice from './states/productsSlice';

const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    measures: measuresSlice.reducer,
    products: productsSlice.reducer
  },
});
export default store;
