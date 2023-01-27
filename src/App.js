import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Welcome from "./pages/Welcome";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
