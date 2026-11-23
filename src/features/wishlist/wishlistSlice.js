import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utils/storage.js";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: loadState("wishlist", []) },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((p) => p.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        });
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export const selectWishlist = (state) => state.wishlist.items;
export default wishlistSlice.reducer;
