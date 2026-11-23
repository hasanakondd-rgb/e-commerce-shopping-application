import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
import { selectWishlist, toggleWishlist } from "../features/wishlist/wishlistSlice.js";
import { selectProducts } from "../features/products/productsSlice.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useToast } from "../components/ToastContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const cachedProducts = useSelector(selectProducts);
  const wishlist = useSelector(selectWishlist);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      // Use already-fetched data if available for an instant render
      const cached = cachedProducts.find((p) => String(p.id) === id);
      if (cached) {
        setProduct(cached);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const text = await res.text();
        if (!text) throw new Error("Product not found");
        setProduct(JSON.parse(text));
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Failed to load product");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [id, cachedProducts]);

  if (loading) return <Loader text="Loading product..." />;
  if (error || !product) {
    return (
      <>
        <ErrorMessage message={error || "Product not found"} />
        <Link to="/" className="btn btn-outline">
          ← Back to products
        </Link>
      </>
    );
  }

  const isWished = wishlist.some((p) => p.id === product.id);

  const handleAdd = () => {
    dispatch(addToCart(product));
    showToast("Product added to cart");
  };

  return (
    <section>
      <button className="btn btn-outline back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-info">
          <span className="category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="price price-lg">${product.price.toFixed(2)}</p>
          {product.rating && (
            <p className="rating">
              ⭐ {product.rating.rate} <span>({product.rating.count} reviews)</span>
            </p>
          )}
          <h3>Description</h3>
          <p className="description">{product.description}</p>

          <div className="details-actions">
            <button className="btn btn-primary" onClick={handleAdd}>
              Add to Cart
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                dispatch(toggleWishlist(product));
                showToast(isWished ? "Removed from wishlist" : "Added to wishlist", isWished ? "info" : "success");
              }}
            >
              {isWished ? "♥ In Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
