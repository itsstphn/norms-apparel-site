import { Link } from "react-router-dom";
import "./CartItem.css";

const CartItem = ({
  item,
  handleRemoveFromCart,
  handleReduceQuantity,
  handleAddQuantity,
}) => {
  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`}>
        <img src={item.thumbnailURL} alt="cart-product" />
      </Link>
      <Link to={`/product/${item.id}`}>
        <p>{item.productName}</p>
      </Link>
      <p>Php {item.totalPrice}</p>
      <div className="quantity">
        <div>
          <button
            onClick={() => handleReduceQuantity(item)}
            className="btn-minus"
          >
            -
          </button>
          <p>{item.quantity}</p>
          <button onClick={() => handleAddQuantity(item)} className="btn-add">
            +
          </button>
        </div>
      </div>
      <button onClick={() => handleRemoveFromCart(item)} className="btn-delete">
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default CartItem;
