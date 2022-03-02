import "./CartTotal.css";

const CartTotal = ({ totalQuantity, totalPrice }) => {
  return (
    <div className="cart-total">
      <p>
        Total&nbsp;
        <span>
          ({totalQuantity} items): Php {totalPrice}
        </span>
      </p>
      <button>Checkout</button>
    </div>
  );
};

export default CartTotal;
