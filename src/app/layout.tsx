import "./globals.css";

import { RecipesProvider } from "@/context/recipesContext";
import { ReactNode } from "react";

export const metadata = {
  title: "Mon Application de Recettes",
  description: "Générateur d'idées recettes",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <header className="bg-gray-900 text-white p-4 shadow-md">
          <h1 className="text-4xl font-bold tracking-tight">CookFusion</h1>
          <h2 className="text-lg text-white tracking-wider">🛒📋 Une seule liste, toutes vos recettes ! Parce que le temps est précieux, facilitez-vous la vie.</h2>
        </header>
        <main className="flex-1 container mx-auto p-6">
          <RecipesProvider>{children}</RecipesProvider>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; {new Date().getFullYear()} - Développé avec NextJS par Loïc BARHER</p>
        </footer>
      </body>
    </html>
  );
}
