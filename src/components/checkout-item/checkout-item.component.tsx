import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

import { selectCartItems } from "../../store/cart/cart.selector";

import {
  Arrow,
  Value,
  RemoveButton,
  Quantity,
  ImageContainer,
  CheckoutItemContainer,
  BaseSpan,
} from "./checkout-item.styles";

import { CartItem } from "../../store/cart/cart.types";

type CheckoutItemProps = {
  item: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({ item }) => {
  const { name, quantity, price, imageUrl } = item;

  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, item));

  const addItemHandler = () => dispatch(addItemToCart(cartItems, item));

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, item));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>

      <Quantity>
        <Arrow>{<span onClick={removeItemHandler}>&#10094;</span>}</Arrow>
        <Value>{quantity}</Value>
        <Arrow> {<span onClick={addItemHandler}>&#10095;</span>}</Arrow>
      </Quantity>

      <BaseSpan>${price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
