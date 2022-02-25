import { createSlice } from "@reduxjs/toolkit";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    loadItems(state, action) {
      const items = action.payload;
      state.items = [...items];
    },
  },
});

export const fetchCart = () => async (dispatch) => {
  const unsub = onSnapshot(collection(db, "cartItems"), (collection) => {
    const cartItems = [];
    collection.forEach((doc) => {
      cartItems.push(doc.data());
    });
    dispatch(loadItems(cartItems));
  });

  return () => unsub();
};

export const { addItem, removeItem, loadItems } = cartSlice.actions;

export default cartSlice;
