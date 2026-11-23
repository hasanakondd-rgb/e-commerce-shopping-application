import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
import { selectWishlist, toggleWishlist } from "../features/wishlist/wishlistSlice.js";
import { useToast } from "./ToastContext.jsx";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const wishlist = useSelector(selectWishlist);
  const isWished = wishlist.some((p) => p.id === product.id);

  const handleAdd = () => {
    dispatch(addToCart(product));
    showToast(`Added "${truncate(product.title, 30)}" to cart`);
  };

  const handleWish = () => {
    dispatch(toggleWishlist(product));
    showToast(isWished ? "Removed from wishlist" : "Added to wishlist", isWished ? "info" : "success");
  };

  return (
    <article className="card">
      <button
        className={`wish-btn ${isWished ? "active" : ""}`}
        onClick={handleWish}
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
        title={isWished ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWished ? "♥" : "♡"}
      </button>

      <Link to={`/product/${product.id}`} className="card-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>

      <div className="card-body">
        <span className="category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="card-title" title={product.title}>
          {product.title}
        </Link>
        <p className="price">${product.price.toFixed(2)}</p>
        <button className="btn btn-primary" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}
