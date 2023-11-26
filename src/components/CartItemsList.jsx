import { useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";

const CartItemsList = () => {
  const cartItems = useSelector((store) => store.cartState.cartItems);
  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.cartID} cartItem={item} />;
      })}
    </>
  );
};
export default CartItemsList;
