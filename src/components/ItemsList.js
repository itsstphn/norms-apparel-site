import Item from "./Item";
import "./ItemsList.css";

const ItemsList = ({ cart, items, handleRemoveFromCart, handleAddToCart }) => {
  return (
    <div className="item-list">
      {items ? (
        items.map((item) => (
          <Item
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            cart={cart}
            key={item.id}
            item={item}
          ></Item>
        ))
      ) : (
        <p>No Items Available</p>
      )}
    </div>
  );
};

export default ItemsList;
