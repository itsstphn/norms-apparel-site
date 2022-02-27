import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Categories from "../../components/Categories";
import { db } from "../../firebase/config";

import ItemsList from "./../../components/ItemsList";

import "./Home.css";

const Home = () => {
  const dbItems = useSelector((state) => state.products.products);

  const cartItems = useSelector((state) => state.cartItems.items);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [items, setItems] = useState([]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
  };

  useEffect(() => {
    if (selectedCategory === "all") {
      setItems(dbItems);
    } else {
      const items = dbItems.filter(
        (item) => item.productCategory === selectedCategory
      );
      setItems(items);
    }
  }, [dbItems, selectedCategory]);

  const handleAddToCart = async (item) => {
    const docRef = doc(db, "cartItems", item.id);
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (!existingItem) {
      await setDoc(docRef, {
        id: item.id,
        productName: item.productName,
        productPrice: +item.productPrice,
        quantity: 1,
        totalPrice: +item.productPrice,
        thumbnailURL: item.thumbnailURL,
      });
    } else {
      await updateDoc(docRef, {
        quantity: existingItem.quantity + 1,
        totalPrice: existingItem.totalPrice + existingItem.productPrice,
      });
    }
  };

  return (
    <div>
      <h2>Find your style</h2>
      <Categories
        selectedCategory={selectedCategory}
        handleSelectedCategory={handleSelectCategory}
      ></Categories>
      <ItemsList
        cart={false}
        handleAddToCart={handleAddToCart}
        items={items}
      ></ItemsList>
    </div>
  );
};

export default Home;
