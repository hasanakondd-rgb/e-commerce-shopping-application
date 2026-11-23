import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice.js";
import { useToast } from "../components/ToastContext.jsx";

export default function Cart() {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartTotal);

  // Flat demo values for the order summary
  const shipping = items.length > 0 ? (subtotal > 100 ? 0 : 5) : 0;
  const total = subtotal + shipping;

  const handleRemove = (item) => {
    // Bonus: confirmation before removing
    if (window.confirm(`Remove "${item.title}" from your cart?`)) {
      dispatch(removeFromCart(item.id));
      showToast("Item removed from cart", "info");
    }
  };

  const handleClear = () => {
    if (window.confirm("Remove all items from your cart?")) {
      dispatch(clearCart());
      showToast("Cart cleared", "info");
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-box">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1 className="page-title">Shopping Cart ({count})</h1>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-thumb">
                <img src={item.image} alt={item.title} />
              </Link>

              <div className="cart-info">
                <Link to={`/product/${item.id}`} className="cart-title">
                  {item.title}
                </Link>
                <span className="category">{item.category}</span>
                <p className="unit-price">Unit price: ${item.price.toFixed(2)}</p>
              </div>

              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-value" aria-label="Quantity">
                  {item.quantity}
                </span>
                <button
                  className="qty-btn"
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="line-total">${(item.price * item.quantity).toFixed(2)}</div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(item)}
                aria-label={`Remove ${item.title}`}
                title="Remove"
              >
                🗑
              </button>
            </div>
          ))}

          <button className="btn btn-danger-outline" onClick={handleClear}>
            Clear Cart
          </button>
        </div>

        <aside className="summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items ({count})</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="hint">Free shipping on orders over $100.</p>
          <Link to="/checkout" className="btn btn-primary btn-block">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
