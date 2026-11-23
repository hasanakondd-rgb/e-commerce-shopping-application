import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../features/cart/cartSlice.js";

export default function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const shipping = items.length > 0 ? (subtotal > 100 ? 0 : 5) : 0;
  const total = subtotal + shipping;

  const [form, setForm] = useState({ name: "", email: "", address: "", city: "" });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null); // holds a snapshot of the placed order

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setOrder({
      id: "ORD-" + Date.now().toString().slice(-8),
      items,
      subtotal,
      shipping,
      total,
      customer: form,
    });
    dispatch(clearCart());
  };

  // Order confirmation screen
  if (order) {
    return (
      <div className="empty-box confirmation">
        <div className="empty-icon">✅</div>
        <h2>Thank you, {order.customer.name}!</h2>
        <p>
          Your order <strong>{order.id}</strong> has been placed successfully.
        </p>
        <p>
          Total paid: <strong>${order.total.toFixed(2)}</strong> · Items:{" "}
          {order.items.reduce((s, i) => s + i.quantity, 0)}
        </p>
        <p className="hint">A confirmation was sent to {order.customer.email} (demo only).</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-box">
        <div className="empty-icon">🛒</div>
        <h2>Nothing to check out</h2>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1 className="page-title">Checkout</h1>

      <div className="cart-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Shipping Details</h2>

          {[
            ["name", "Full Name", "text"],
            ["email", "Email", "email"],
            ["address", "Address", "text"],
            ["city", "City", "text"],
          ].map(([field, label, type]) => (
            <label className="field" key={field}>
              <span>{label}</span>
              <input
                className={`input ${errors[field] ? "input-error" : ""}`}
                type={type}
                name={field}
                value={form[field]}
                onChange={handleChange}
              />
              {errors[field] && <small className="error-text">{errors[field]}</small>}
            </label>
          ))}

          <button type="submit" className="btn btn-primary btn-block">
            Place Order (${total.toFixed(2)})
          </button>
        </form>

        <aside className="summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div className="summary-row" key={item.id}>
              <span className="summary-item-name">
                {item.title.length > 28 ? item.title.slice(0, 27) + "…" : item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row">
            <span>Subtotal</span>
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
        </aside>
      </div>
    </section>
  );
}
