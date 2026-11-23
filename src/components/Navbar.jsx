import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice.js";
import { selectWishlist } from "../features/wishlist/wishlistSlice.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlist).length;

  const close = () => setOpen(false);
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={close}>
          🛍️ ShopEase
        </Link>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end className={linkClass} onClick={close}>
            Home
          </NavLink>
          <NavLink to="/wishlist" className={linkClass} onClick={close}>
            Wishlist
            {wishlistCount > 0 && <span className="badge badge-soft">{wishlistCount}</span>}
          </NavLink>
          <NavLink to="/cart" className={linkClass} onClick={close}>
            Cart
            <span className="badge" data-testid="cart-count">
              {cartCount}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
