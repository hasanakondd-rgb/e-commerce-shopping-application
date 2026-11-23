# React E-Commerce (ShopEase)

## Project Description

ShopEase is a simple e-commerce shopping application built with **React.js** and **Redux Toolkit**. Users can browse products fetched from the [Fake Store API](https://fakestoreapi.com), view product details, search / filter / sort products, and manage a shopping cart whose state lives entirely in Redux Toolkit.

## Technologies Used

- React 18 (components + hooks: `useState`, `useEffect`, `useMemo`, `useContext`)
- Redux Toolkit (`configureStore`, `createSlice`, `createAsyncThunk`)
- React-Redux (`useSelector`, `useDispatch`)
- React Router v6
- Vite
- Fake Store API
- Plain CSS (responsive, no UI library)

## Main Features

**Required**

- Home page with a responsive product grid (image, name, price, category, Add to Cart)
- Loading spinner while fetching and error message with a *Try Again* button
- Product details page (`/product/:id`) via React Router
- Search by product name
- Filter by category (categories fetched from the API)
- Sort by price (low → high / high → low)
- Shopping cart: increase / decrease quantity, remove item, per-item price, subtotal & total, empty-cart message
- Responsive navbar with logo, Home, Cart and a live cart item count
- Redux store with a cart slice containing `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`

**Bonus**

- Wishlist (add / remove from cards and details page, `/wishlist` page)
- Cart and wishlist saved in LocalStorage
- Success toast notifications when adding to cart
- Checkout page with form validation and order summary + confirmation
- Confirmation dialog before removing a product / clearing the cart

## Project Structure

```
src/
├── app/store.js                    # configureStore + localStorage persistence
├── features/
│   ├── cart/cartSlice.js           # cart reducers & selectors
│   ├── products/productsSlice.js   # async thunks for products & categories
│   └── wishlist/wishlistSlice.js
├── components/                     # Navbar, ProductCard, Loader, ErrorMessage, Toast
├── pages/                          # Home, ProductDetails, Cart, Checkout, Wishlist, NotFound
├── utils/storage.js
├── App.jsx
├── main.jsx
└── index.css
```

## Installation Instructions

Requirements: [Node.js](https://nodejs.org/) 18 or later.

```bash
git clone https://github.com/hasanakondd-rgb/e-commerce-shopping-application.git
cd react-ecommerce-assignment
npm install
```

## How to Run the Project

```bash
# development server (http://localhost:5173)
npm run dev

# production build
npm run build

# preview the production build
npm run preview
```

## Live Project Link

> Add your deployed URL here, e.g. https://react-ecommerce-assignment.vercel.app

## Author

Md. Hasan Akond
