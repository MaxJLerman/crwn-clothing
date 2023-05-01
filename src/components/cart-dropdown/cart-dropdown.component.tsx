import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from "../button/button.types";
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const toggleIsCartOpen = () => {
    return dispatch(setIsCartOpen(!isCartOpen));
  };

  // useCallback is used to prevent re-rendering the component if nothing inside the function changes, memoizing the function (not the output of the function)
  const goToCheckoutHandler = useCallback(() => {
    toggleIsCartOpen();
    navigate('/checkout');
  // eslint-disable-next-line
  }, []);
    
  return(
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length // no need for "< 1" because if 0, will return false
            ? ( cartItems.map(item => <CartItem key={item.id} cartItem={item} />) )
            : ( <EmptyMessage>Your cart is empty</EmptyMessage> )
        }
      </CartItems>
      <Button buttonType={BUTTON_TYPE_CLASSES.DEFAULT_BUTTON} onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
