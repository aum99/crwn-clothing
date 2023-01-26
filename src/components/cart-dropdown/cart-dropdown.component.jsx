import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./cart-dropdown.styles.scss";

import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

const CartDropDown = () => {
  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);

  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropDown;
