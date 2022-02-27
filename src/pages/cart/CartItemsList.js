import CartItem from "./CartItem";

const CartItemsList = ({
  items,
  handleAddQuantity,
  handleReduceQuantity,
  handleRemoveFromCart,
}) => {
  return (
    <div className="cart-items-list">
      {items.map((item) => (
        <CartItem
          item={item}
          key={item.id}
          handleReduceQuantity={handleReduceQuantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveFromCart={handleRemoveFromCart}
        ></CartItem>
      ))}
    </div>
  );
};

export default CartItemsList;
