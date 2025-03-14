"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/authContext";
import { RecipesProvider } from "@/context/recipesContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <RecipesProvider>
        {children}
      </RecipesProvider>
    </AuthProvider>
  );
}
