"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";

export interface CartItem {
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string | null;
  is_veg: boolean;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { menu_item_id: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: CartItem[] };

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  let items: CartItem[];

  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.menu_item_id === action.payload.menu_item_id
      );
      if (existing) {
        items = state.items.map((i) =>
          i.menu_item_id === action.payload.menu_item_id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        items = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { items, total: calculateTotal(items) };
    }
    case "REMOVE_ITEM":
      items = state.items.filter((i) => i.menu_item_id !== action.payload);
      return { items, total: calculateTotal(items) };
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        items = state.items.filter(
          (i) => i.menu_item_id !== action.payload.menu_item_id
        );
      } else {
        items = state.items.map((i) =>
          i.menu_item_id === action.payload.menu_item_id
            ? { ...i, quantity: action.payload.quantity }
            : i
        );
      }
      return { items, total: calculateTotal(items) };
    case "CLEAR":
      return { items: [], total: 0 };
    case "HYDRATE":
      return { items: action.payload, total: calculateTotal(action.payload) };
    default:
      return state;
  }
}

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("brew-truck-cart");
      if (saved) {
        const items = JSON.parse(saved) as CartItem[];
        dispatch({ type: "HYDRATE", payload: items });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("brew-truck-cart", JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        itemCount,
        addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
        updateQuantity: (id, qty) =>
          dispatch({ type: "UPDATE_QUANTITY", payload: { menu_item_id: id, quantity: qty } }),
        clearCart: () => dispatch({ type: "CLEAR" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
