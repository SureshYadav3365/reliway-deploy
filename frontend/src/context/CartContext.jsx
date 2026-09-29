import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const CART_STORAGE_KEY = 'shopease_cart_v1';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to read cart from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to persist cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, showToast = true) => {
    if (!product || !product.id) return;
    
    // Check stock
    const currentInCart = cartItems.find((item) => item.id === product.id)?.quantity || 0;
    const requestedQty = currentInCart + quantity;
    const maxStock = typeof product.stock === 'number' ? product.stock : 99;

    if (maxStock <= 0) {
      toast.error('Sorry, this product is currently out of stock.');
      return;
    }

    if (requestedQty > maxStock) {
      toast.error(`Only ${maxStock} items available in stock.`);
      return;
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            discount: product.discount,
            category: product.category,
            brand: product.brand,
            image: (product.images && product.images[0]) || product.image || '',
            stock: product.stock,
            quantity: quantity,
          },
        ];
      }
    });

    if (showToast) {
      toast.success(`${product.name.slice(0, 24)}... added to Cart!`);
    }
  };

  const removeFromCart = (productId, showToast = true) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);
      if (itemToRemove && showToast) {
        toast.success(`Removed ${itemToRemove.name.slice(0, 20)}... from Cart`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const maxStock = typeof item.stock === 'number' ? item.stock : 99;
          const clampedQty = Math.min(newQuantity, maxStock);
          if (newQuantity > maxStock) {
            toast.error(`Maximum available stock is ${maxStock}`);
          }
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  const originalTotal = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice || item.price || 0) * item.quantity,
    0
  );

  const discount = Math.max(0, originalTotal - subtotal);
  // Free delivery over $50, else $10
  const delivery = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal > 0 ? Number((subtotal * 0.05).toFixed(2)) : 0;
  const total = Number((subtotal + delivery + tax).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        subtotal,
        originalTotal,
        discount,
        delivery,
        tax,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
