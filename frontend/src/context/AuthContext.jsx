import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { initialMockOrders } from '../data/mockOrders';

const AuthContext = createContext();

const AUTH_USER_KEY = 'shopease_auth_user_v1';
const USERS_DB_KEY = 'shopease_users_db_v1';
const ORDERS_STORAGE_KEY = 'shopease_orders_v1';

const DEFAULT_DEMO_USER = {
  id: 'usr-1001',
  fullName: 'Alex Johnson',
  phone: '9876543210',
  email: 'alex.johnson@example.com',
  address: '742 Evergreen Terrace, Apt 4B',
  city: 'Springfield',
  state: 'Oregon',
  pincode: '97477',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  memberSince: 'March 2024',
};

export const AuthProvider = ({ children }) => {
  // Current active user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      if (saved) return JSON.parse(saved);
      // Pre-seed with default user so the whole application and account flows are instantly testable
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(DEFAULT_DEMO_USER));
      return DEFAULT_DEMO_USER;
    } catch (e) {
      return DEFAULT_DEMO_USER;
    }
  });

  // Registered users database for mock authentication
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(USERS_DB_KEY);
      if (saved) return JSON.parse(saved);
      const initialUsers = [
        {
          id: 'usr-1001',
          fullName: 'Alex Johnson',
          phone: '9876543210',
          password: 'password123',
          email: 'alex.johnson@example.com',
          address: '742 Evergreen Terrace, Apt 4B',
          city: 'Springfield',
          state: 'Oregon',
          pincode: '97477',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          memberSince: 'March 2024',
        },
      ];
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(initialUsers));
      return initialUsers;
    } catch (e) {
      return [];
    }
  });

  // Orders list
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(initialMockOrders));
      return initialMockOrders;
    } catch (e) {
      return initialMockOrders;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth user to localStorage', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Failed to sync users database to localStorage', e);
    }
  }, [registeredUsers]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders to localStorage', e);
    }
  }, [orders]);

  // Login handler
  const login = (phone, password) => {
    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    const userFound = registeredUsers.find(
      (u) => u.phone.replace(/[^0-9]/g, '') === cleanPhone
    );

    if (!userFound) {
      return { success: false, message: 'No registered account found with this phone number.' };
    }

    if (userFound.password !== password) {
      return { success: false, message: 'Invalid password. Please check your credentials.' };
    }

    const { password: _, ...userSafe } = userFound;
    setCurrentUser(userSafe);
    toast.success(`Welcome back, ${userSafe.fullName}!`);
    return { success: true, user: userSafe };
  };

  // Register handler
  const register = ({ fullName, phone, password }) => {
    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    const alreadyExists = registeredUsers.some(
      (u) => u.phone.replace(/[^0-9]/g, '') === cleanPhone
    );

    if (alreadyExists) {
      return { success: false, message: 'An account with this phone number already exists.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: fullName.trim(),
      phone: cleanPhone,
      password: password,
      email: `${fullName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      address: '',
      city: '',
      state: '',
      pincode: '',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
      memberSince: 'Just now',
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);

    const { password: _, ...userSafe } = newUser;
    setCurrentUser(userSafe);
    toast.success(`Account created successfully! Welcome, ${userSafe.fullName}!`);
    return { success: true, user: userSafe };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    toast.success('Successfully logged out.');
  };

  // Update profile
  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);

    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...updatedFields } : u))
    );
    toast.success('Profile updated successfully!');
  };

  // Place order
  const placeOrder = ({ items, shippingAddress, paymentMethod, pricing }) => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();

    const newOrder = {
      id: orderId,
      date: now.toISOString(),
      status: 'Ordered',
      currentStep: 0,
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Prepaid Mock)',
      paymentStatus: paymentMethod === 'cod' ? 'Pending (Pay upon Delivery)' : 'Paid Successfully',
      shippingAddress: { ...shippingAddress },
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        brand: item.brand,
      })),
      pricing: { ...pricing },
      trackingHistory: [
        {
          status: 'Ordered',
          title: 'Order Placed',
          time: now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          note: `Order #${orderId} received and registered.`,
        },
        {
          status: 'Confirmed',
          title: 'Order Confirmation',
          time: 'Estimated within 1 hour',
          note: 'Verification and dispatch preparation.',
        },
        {
          status: 'Processing',
          title: 'Packing at Fulfillment Facility',
          time: 'Upcoming',
          note: 'Secure bubble wrap & safety sealing.',
        },
        {
          status: 'Shipped',
          title: 'Dispatched with Courier',
          time: 'Upcoming',
          note: 'Tracking ID will be issued upon pickup.',
        },
        {
          status: 'Out for Delivery',
          title: 'Out for Delivery',
          time: 'Upcoming',
          note: 'Delivery executive will call prior to arrival.',
        },
        {
          status: 'Delivered',
          title: 'Delivered',
          time: 'Upcoming',
          note: 'Package delivered to recipient.',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // Find order by ID
  const getOrderById = (orderId) => {
    return orders.find((o) => o.id === orderId);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        updateProfile,
        orders,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
