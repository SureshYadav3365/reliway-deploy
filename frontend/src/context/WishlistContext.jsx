import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCart } from './CartContext';

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = 'shopease_wishlist_v1';

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to read wishlist from localStorage', e);
      return [];
    }
  });

  const { addToCart } = useCart();

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Failed to persist wishlist to localStorage', e);
    }
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const addToWishlist = (product) => {
    if (!product || !product.id) return;
    if (isInWishlist(product.id)) {
      toast('Item already in your wishlist', { icon: 'ℹ️' });
      return;
    }

    setWishlistItems((prev) => [
      ...prev,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        rating: product.rating,
        reviews: product.reviews,
        stock: product.stock,
        category: product.category,
        brand: product.brand,
        image: (product.images && product.images[0]) || product.image || '',
      },
    ]);
    toast.success('Added to Wishlist!', { icon: '❤️' });
  };

  const removeFromWishlist = (productId, showToast = true) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    if (showToast) {
      toast.success('Removed from Wishlist');
    }
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const moveToCart = (product) => {
    addToCart(product, 1, false);
    removeFromWishlist(product.id, false);
    toast.success('Moved to Cart!');
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        moveToCart,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
