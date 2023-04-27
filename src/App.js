import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { checkUserSession } from './store/user/user.action';
import Spinner from './components/spinner/spinner.component';
import { GlobalStyle } from './global.styles';

// lazy imports usually used for routed components
// react won't render the component until it is required to be rendered, used in conjunction with Suspense below
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);
  // dispatch not needed inside dependency array because it never changes
  // written inside the array because React doesn't know that dispatch variable is being pulled from a hook
  // because redux generates one dispatch and it will never change that reference
  
  return (
    <Suspense fallback={<Spinner />}>
    {/* whilst react is fetching the components needing rendering, fallback component is rendered */}
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} /> {/* including "index" makes it so the Home component shows when the path is just '/' */}
          <Route path='shop/*' element={<Shop />} /> {/* the path suffix of /* means anything after the shop component is rendered in the shop and then the further routing is done inside the shop component */}
          <Route path='authentication' element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
