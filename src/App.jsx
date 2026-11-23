import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { ToastProvider } from "./components/ToastContext.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <ToastProvider>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>ShopEase &copy; {new Date().getFullYear()} · React + Redux Toolkit assignment</p>
      </footer>
    </ToastProvider>
  );
}
