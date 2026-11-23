import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch products");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/products/categories`);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch categories");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const selectProducts = (state) => state.products.items;
export const selectCategories = (state) => state.products.categories;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
