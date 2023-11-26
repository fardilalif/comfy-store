import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItemsList, CartTotals, SectionTitle } from "../components";

const Cart = () => {
  const user = useSelector((store) => store.userState.user);
  const numItemsInCart = useSelector((store) => store.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              PROCEED TO CHECKOUT
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              PLEASE LOGIN
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
