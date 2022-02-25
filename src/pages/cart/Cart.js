import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

import CartItemsList from "./CartItemsList";

const Cart = () => {
  const items = useSelector((state) => state.cartItems.items);

  const handleRemoveFromCart = async (item) => {
    const docRef = doc(db, "cartItems", item.id);
    await deleteDoc(docRef);
  };

  const handleAddQuantity = async (item) => {
    const existingItem = items.find((item) => existingItem.id === item.id);
    const docRef = doc(db, "cartItems", item.id);
    await updateDoc(docRef, {
      quantity: existingItem.quantity + 1,
    });
  };
  return (
    <div>
      <h3>My Cart</h3>
      <CartItemsList
        items={items}
        handleAddQuantity={handleAddQuantity}
        handleRemoveFromCart={handleRemoveFromCart}
      ></CartItemsList>
    </div>
  );
};

export default Cart;
