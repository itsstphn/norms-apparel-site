import { Link } from "react-router-dom";

import "./Item.css";

const Item = ({ cart, item, handleRemoveFromCart, handleAddToCart }) => {
  return (
    <div className="item">
      <Link to={`/product/${item.id}`}>
        <img src={item.thumbnailURL} alt="product" />
        <p>{item.productName}</p>
      </Link>

      <p>{item.productPrice}</p>
      {cart ? (
        <button onClick={() => handleRemoveFromCart(item)}>
          Remove from Cart
        </button>
      ) : (
        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
      )}
    </div>
  );
};

export default Item;
