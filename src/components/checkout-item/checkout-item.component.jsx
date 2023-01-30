import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  Arrow,
  Value,
  RemoveButton,
  Quantity,
  ImageContainer,
  CheckoutItemContainer,
  BaseSpan,
} from "./checkout-item.styles";

const CheckoutItem = ({ item }) => {
  const { name, quantity, price, imageUrl } = item;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(item);

  const addItemHandler = () => addItemToCart(item);

  const removeItemHandler = () => removeItemFromCart(item);

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
};

export default CheckoutItem;
