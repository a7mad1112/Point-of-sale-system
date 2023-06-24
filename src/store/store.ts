import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './states/categoriesSlice';
import measuresSlice from './states/measuresSlice';
import productsSlice from './states/productsSlice';
import cartsSlice from './states/cartSlice';
import cartProductsSlice from './states/cartProductsSlice';

const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    measures: measuresSlice.reducer,
    products: productsSlice.reducer,
    carts: cartsSlice.reducer,
    cartProducts: cartProductsSlice.reducer,
  },
});
export default store;
