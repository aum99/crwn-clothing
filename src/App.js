import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkUserSession } from "./store/user/user.action";

import Spinner from "./components/spinner/spinner.components";

const Home = lazy(() => import("./Routes/home/home.component"));
const Navigation = lazy(() =>
  import("./Routes/navigation/navigation.component")
);
const Authentication = lazy(() =>
  import("./Routes/authentication/authentication.component")
);
const Shop = lazy(() => import("./Routes/shop/shop.component"));
const Checkout = lazy(() => import("./Routes/checkout/checkout.component"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
