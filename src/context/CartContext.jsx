import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext(null);

function getStorage(key) {
  if (typeof window === 'undefined') {
    return [];
  }
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse cart from storage', error);
    return [];
  }
}

function persistStorage(key, items) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(items));
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const storageKey = useMemo(() => (user ? `cart_${user.id}` : 'cart_guest'), [user]);
  const [items, setItems] = useState(() => getStorage(storageKey));

  useEffect(() => {
    setItems(getStorage(storageKey));
  }, [storageKey]);

  useEffect(() => {
    persistStorage(storageKey, items);
  }, [storageKey, items]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.product.id === product.id);
      if (existing) {
        return prev.map((entry) =>
          entry.product.id === product.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((entry) => entry.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((prev) =>
      prev.map((entry) =>
        entry.product.id === productId
          ? { ...entry, quantity: Math.max(1, quantity) }
          : entry
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totals = useMemo(() => {
    const count = items.reduce((sum, entry) => sum + entry.quantity, 0);
    const total = items.reduce((sum, entry) => sum + entry.quantity * (entry.product.price ?? 0), 0);
    return { count, total };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totals
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
