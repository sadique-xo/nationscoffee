"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const STORAGE_KEY = "brew-truck-customer";

interface CustomerSession {
  phone: string;
  name: string;
  activeOrderIds: string[]; // order IDs that are still in progress
}

interface CustomerContextType extends CustomerSession {
  setCustomer: (phone: string, name: string) => void;
  addActiveOrder: (orderId: string) => void;
  removeActiveOrder: (orderId: string) => void;
  clearSession: () => void;
  isLoggedIn: boolean;
}

const CustomerContext = createContext<CustomerContextType | null>(null);

function loadSession(): CustomerSession {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return { phone: "", name: "", activeOrderIds: [] };
}

function saveSession(session: CustomerSession) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore
  }
}

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<CustomerSession>({
    phone: "",
    name: "",
    activeOrderIds: [],
  });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    setSession(loadSession());
    setHydrated(true);
  }, []);

  // Persist to localStorage on change (skip initial render)
  useEffect(() => {
    if (hydrated) {
      saveSession(session);
    }
  }, [session, hydrated]);

  const setCustomer = useCallback((phone: string, name: string) => {
    setSession((prev) => ({ ...prev, phone, name }));
  }, []);

  const addActiveOrder = useCallback((orderId: string) => {
    setSession((prev) => ({
      ...prev,
      activeOrderIds: prev.activeOrderIds.includes(orderId)
        ? prev.activeOrderIds
        : [...prev.activeOrderIds, orderId],
    }));
  }, []);

  const removeActiveOrder = useCallback((orderId: string) => {
    setSession((prev) => ({
      ...prev,
      activeOrderIds: prev.activeOrderIds.filter((id) => id !== orderId),
    }));
  }, []);

  const clearSession = useCallback(() => {
    setSession({ phone: "", name: "", activeOrderIds: [] });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        ...session,
        setCustomer,
        addActiveOrder,
        removeActiveOrder,
        clearSession,
        isLoggedIn: session.phone.length === 10,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx)
    throw new Error("useCustomer must be used within CustomerProvider");
  return ctx;
}
