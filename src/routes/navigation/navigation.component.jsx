import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { NavigationContainer, LogoContainer, NavigationLinks, NavigationLink } from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavigationLinks>
          <NavigationLink to='/shop'>shop</NavigationLink>
          {
            currentUser
              ? ( <NavigationLink as="span" onClick={signOutUser}>sign out</NavigationLink> ) // previous span component changed to styled NavigationLink component but is still rendered as a span component
              : ( <NavigationLink to='/authentication'>sign in</NavigationLink> )
          }
          <CartIcon />
        </NavigationLinks>
        {
          isCartOpen && <CartDropdown /> // because && is a short circuit operator, CardDropdown element will only show when isCartOpen variable is true
        }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
