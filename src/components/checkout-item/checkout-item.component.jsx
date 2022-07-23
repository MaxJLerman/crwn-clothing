import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import { CheckoutItemContainer, ImageContainer, DefaultSpan, QuantitySpan, Arrow, ValueSpan, RemoveButton } from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) =>
{
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <DefaultSpan>{name}</DefaultSpan>
            <QuantitySpan>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <ValueSpan>{quantity}</ValueSpan>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </QuantitySpan>
            <DefaultSpan>{price}</DefaultSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;