# ShopEase — Modern E-Commerce Frontend

ShopEase is a modern, standalone React + Vite e-commerce frontend application built with a responsive design, clean aesthetics, Context API state management with localStorage persistence, and prepared Axios structure for future backend integration.

---

## 🚀 Key Features

### 1. Complete Page Lineup (16 Routes)
- **Home (`/`)**: Hero banner, category department tiles, featured collection, best-selling picks, new arrivals, flash deals with discount badges, customer testimonials, newsletter discount code prompt, and value propositions.
- **Shop (`/shop`)**: Complete product catalog with real-time keyword search, multi-category filter, brand filter, price range selector, rating filter, in-stock availability toggle, multi-criteria sorting (Popularity, Newest, Price Low-High, Price High-Low, Rating), pagination, item counter, and empty states.
- **Product Details (`/product/:id`)**: High-res multi-image gallery with thumbnail switcher, live stock indicators, key-value specifications table, quantity selector, "Add to Cart", "Buy Now", wishlist toggle, tabbed reviews with review submission, and related products grid.
- **Categories (`/categories`)**: Visual cards for 8 departments (Electronics, Fashion, Shoes, Beauty, Home, Accessories, Grocery, Sports) with direct filter deep-linking.
- **Offers (`/offers`)**: Promotional hero banner, interactive copyable coupon vouchers (`EASE40`, `SAVE25`, `FREESHIP`), mega clearance deals (25%+ off), and discounted product grids.
- **Shopping Cart (`/cart`)**: Quantity increment/decrement, live stock cap validation, product removal, subtotal, discount savings, free delivery over $50 calculation, tax, and order summary.
- **Wishlist (`/wishlist`)**: Saved products, live stock status, single-click "Move to Cart", and removal.
- **Checkout (`/checkout`)**: 3-step checkout flow (Shipping details with field validation, Order summary review, Payment method selection with COD & Online options), confetti celebration upon placing order, and live receipt view.
- **Login (`/login`)**: Mock phone + password authentication with one-click demo auto-fill and validation error messages.
- **Register (`/register`)**: Account registration form with name, phone, password, confirm password, and client-side validation.
- **My Account (`/account`)**: Tabbed dashboard with editable profile info, saved delivery addresses, preferences, and session logout.
- **My Orders (`/orders`)**: Complete order history cards with item breakdowns, dates, totals, and payment status badges.
- **Order Details (`/orders/:id`)**: Live order status timeline tracker (**Ordered ➔ Confirmed ➔ Processing ➔ Shipped ➔ Out for Delivery ➔ Delivered**), milestone timestamp history, items breakdown, recipient address, and receipt.
- **About (`/about`)**: Company vision, brand story, quality guarantees, and customer pillars.
- **Contact (`/contact`)**: Contact form with validation, success notifications, and direct contact channels.
- **404 Not Found (`*`)**: Responsive error page with recovery navigation.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + Vite
- **Routing**: React Router v7 (`react-router-dom`)
- **State Management**: React Context API (`CartContext`, `WishlistContext`, `AuthContext`) with automatic `localStorage` synchronization
- **Styling**: Vanilla CSS Design System with CSS Custom Properties, smooth hover animations, glassmorphism, responsive grid & flexbox
- **Icons**: `react-icons` (Feather & FontAwesome)
- **Notifications**: `react-hot-toast`
- **Effects**: `canvas-confetti`
- **HTTP Client**: Prepared `axios` instance with request & response interceptors in `src/utils/api.js`

---

## 📦 Getting Started

### 1. Installation
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build
```bash
npm run build
```
Verify the production bundle in the `dist/` directory.

---

## 🧪 Demo Credentials
- **Phone**: `9876543210`
- **Password**: `password123`
- *(Or use the "Fill Demo" shortcut on the login page, or register any new phone number)*
