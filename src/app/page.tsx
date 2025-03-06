"use client";
import React from "react";
import Form from "@/components/Form";
import Results from "@/components/Results";
import ShoppingList from "@/components/ShoppingList";
import { useRecipes } from "@/context/recipesContext";
import { Recipe } from "@/context/recipesContext";

export default function HomePage() {
  const { recipes, setRecipes } = useRecipes();

  const handleIncrement = (id: number) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, selectedPeople: (r.selectedPeople ?? r.personnes) + 1 }
          : r
      )
    );
  };

  const handleDecrement = (id: number) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, selectedPeople: Math.max(1, (r.selectedPeople ?? r.personnes) - 1) }
          : r
      )
    );
  };

  const handleReplaceRecipe = async (id: number) => {
    try {
      const response = await fetch(`/api/recipes?count=50&vegetarian=false`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des recettes pour le remplacement");
      }
      const data = await response.json();
      const allNewRecipes = data.recettes;
      // Filtrer celles déjà affichées dans le contexte.
      const existingIds = new Set(recipes.map((r) => r.id));
      const candidate = allNewRecipes.find((r: Recipe) => !existingIds.has(r.id));
      if (candidate) {
        // Remplacer la recette avec l'id donné par candidate
        setRecipes((prev) =>
          prev.map((r) => (r.id === id ? candidate : r))
        );
      } else {
        console.log("Aucune nouvelle recette disponible pour le remplacement.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form />
      <Results
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReplaceRecipe={handleReplaceRecipe}
      />
      <ShoppingList />
    </>
  );
}
