import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectWishlist } from "../features/wishlist/wishlistSlice.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Wishlist() {
  const items = useSelector(selectWishlist);

  if (items.length === 0) {
    return (
      <div className="empty-box">
        <div className="empty-icon">♡</div>
        <h2>Your wishlist is empty</h2>
        <p>Tap the heart on any product to save it here.</p>
        <Link to="/" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1 className="page-title">My Wishlist ({items.length})</h1>
      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
