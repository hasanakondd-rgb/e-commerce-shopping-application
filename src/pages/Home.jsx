import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  selectProducts,
  selectCategories,
  selectProductsStatus,
  selectProductsError,
} from "../features/products/productsSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  // UI-only state for search / filter / sort (cart itself lives in Redux)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, status, categories.length]);

  const visibleProducts = useMemo(() => {
    let list = [...products];

    const q = search.trim().toLowerCase();
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));

    if (category !== "all") list = list.filter((p) => p.category === category);

    if (sort === "low-high") list.sort((a, b) => a.price - b.price);
    else if (sort === "high-low") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, category, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
  };

  return (
    <section>
      <h1 className="page-title">All Products</h1>

      <div className="filters">
        <input
          type="search"
          className="input"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />

        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort by price"
        >
          <option value="default">Sort: Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        <button className="btn btn-outline" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {(status === "loading" || status === "idle") && <Loader text="Fetching products..." />}

      {status === "failed" && (
        <ErrorMessage message={error} onRetry={() => dispatch(fetchProducts())} />
      )}

      {status === "succeeded" && (
        <>
          <p className="result-count">
            Showing {visibleProducts.length} of {products.length} products
          </p>
          {visibleProducts.length === 0 ? (
            <div className="empty-box">
              <h3>No products found</h3>
              <p>Try a different search term or category.</p>
            </div>
          ) : (
            <div className="grid">
              {visibleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
