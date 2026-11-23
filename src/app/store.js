import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice.js";
import productsReducer from "../features/products/productsSlice.js";
import wishlistReducer from "../features/wishlist/wishlistSlice.js";
import { saveState } from "../utils/storage.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
  },
});

// Bonus: persist cart + wishlist in LocalStorage whenever they change
let lastCart = store.getState().cart;
let lastWishlist = store.getState().wishlist;
store.subscribe(() => {
  const { cart, wishlist } = store.getState();
  if (cart !== lastCart) {
    lastCart = cart;
    saveState("cart", cart.items);
  }
  if (wishlist !== lastWishlist) {
    lastWishlist = wishlist;
    saveState("wishlist", wishlist.items);
  }
});

export default store;
