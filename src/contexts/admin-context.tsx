"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface AdminContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <AdminContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
