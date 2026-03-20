"use client";

import { type ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

export function OrderShell({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}
