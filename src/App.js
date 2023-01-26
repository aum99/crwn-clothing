import { Routes, Route } from "react-router-dom";
import Home from "./Routes/home/home.components";
import Navigation from "./Routes/navigation/navigation.components";
import Authentication from "./Routes/authentication/authentication.component";
import Shop from "./Routes/shop/shop.components";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
