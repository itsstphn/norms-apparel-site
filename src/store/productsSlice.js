import { createSlice } from "@reduxjs/toolkit";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const productsSlice = createSlice({
  name: "products",
  initialState: { products: [] },

  reducers: {
    loadProducts(state, action) {
      const products = action.payload;
      console.log(products);
      state.products = [...products];
    },
  },
});

export const fetchProducts = () => async (dispatch) => {
  const unsub = onSnapshot(
    collection(db, "products"),
    (collection) => {
      let products = [];
      collection.forEach((doc) => {
        products.push(doc.data());
      });
      dispatch(loadProducts(products));
    },
    (error) => {
      console.log(error);
      console.log(error.message);
    }
  );

  return () => unsub();
};

export const { loadProducts } = productsSlice.actions;

export default productsSlice;
