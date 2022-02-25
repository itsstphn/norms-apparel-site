import { useParams } from "react-router-dom";

import "./Product.css";
import { useSelector } from "react-redux";

const Product = () => {
  const { id } = useParams();
  const items = useSelector((state) => state.products.products);
  console.log(items);

  const item = items.find((item) => {
    return item.id === id;
  });

  return (
    <main className="product-page">
      <img src={item.thumbnailURL} alt="product" />
      <h3>{item.productName}</h3>
      <p>Php {parseFloat(item.productPrice).toLocaleString("en-US")}</p>
    </main>
  );
};

export default Product;
