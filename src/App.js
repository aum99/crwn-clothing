import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkUserSession } from "./store/user/user.action";

import Home from "./Routes/home/home.component";
import Navigation from "./Routes/navigation/navigation.component";
import Authentication from "./Routes/authentication/authentication.component";
import Shop from "./Routes/shop/shop.component";
import Checkout from "./Routes/checkout/checkout.component";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
