import { FC, memo } from 'react';

import { CartItem as CartItemType } from '../../store/cart/cart.types'; // removes duplicate declaration of CartItem error
import { CartItemContainer, ItemDetails } from './cart-item.styles';

type CartItemProps = {
  cartItem: CartItemType,
};

// memo() prevents rerendering of the same component if anything inside doesn't change
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>{quantity} x £{price}</span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
