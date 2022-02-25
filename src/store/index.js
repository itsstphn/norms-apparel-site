import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import productsSlice from "./productsSlice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cartItems: cartSlice.reducer,
  },
});

export default store;
