"use client";
import React, { useEffect, useState } from "react";
import { useRecipes } from "@/context/recipesContext";
import { parseQuantityAndUnit, formatQuantity } from "@/utils/quantityUtils";

type MergedIngredient =
  | { type: "number"; value: number }
  | { type: "unit"; value: number; unit: string }
  | { type: "list"; items: Set<string> };

export default function ShoppingList() {
  const { recipes } = useRecipes();
  const [shoppingList, setShoppingList] = useState<Record<string, MergedIngredient>>({});

  useEffect(() => {
    const merged: Record<string, MergedIngredient> = {};

    recipes.forEach(recipe => {
      const factor = (recipe.selectedPeople ?? recipe.personnes) / recipe.personnes;

      Object.entries(recipe.ingredients).forEach(([ingredient, rawQty]) => {
        const current = merged[ingredient];

        // Cas spécial pour "condiments"
        if (ingredient === "condiments") {
          const items = (typeof rawQty === "string" ? rawQty : "")
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);
          const setItems = new Set(items);
          if (!current) {
            merged[ingredient] = { type: "list", items: setItems };
          } else if (current.type === "list") {
            items.forEach(item => current.items.add(item));
          } else {
            console.error(`Erreur de fusion pour ${ingredient}: incompatibilité de type (list vs autre).`);
          }
          return;
        }

        // Cas 1 : Si la quantité est un nombre (sans unité)
        if (typeof rawQty === "number") {
          const adjusted = Math.ceil(rawQty * factor);
          if (!current) {
            merged[ingredient] = { type: "number", value: adjusted };
          } else if (current.type === "number") {
            current.value += adjusted;
          } else {
            console.error(`Erreur de fusion pour ${ingredient}: incompatibilité entre nombre et valeur avec unité.`);
          }
          return;
        }

        // Cas 2 : Si la quantité est une chaîne (avec unité)
        if (typeof rawQty === "string") {
          const parsed = parseQuantityAndUnit(rawQty);
          if (parsed) {
            const adjusted = Math.ceil(parsed.qty * factor);
            if (!current) {
              merged[ingredient] = { type: "unit", value: adjusted, unit: parsed.unit };
            } else if (current.type === "unit") {
              if (current.unit !== parsed.unit) {
                console.error(`Erreur de fusion pour ${ingredient}: unités différentes (${current.unit} vs ${parsed.unit}).`);
              } else {
                current.value += adjusted;
              }
            } else {
              console.error(`Erreur de fusion pour ${ingredient}: incompatibilité entre type unité et autre.`);
            }
          } else {
            // Traitement comme nombre sans unité en cas d'échec du parsing
            const num = parseFloat(rawQty);
            if (!isNaN(num)) {
              const adjusted = Math.ceil(num * factor);
              if (!current) {
                merged[ingredient] = { type: "number", value: adjusted };
              } else if (current.type === "number") {
                current.value += adjusted;
              } else {
                console.error(`Erreur de fusion pour ${ingredient}: incompatibilité entre nombre et valeur avec unité.`);
              }
            } else {
              console.error(`Erreur de parsing pour ${ingredient}: valeur "${rawQty}" non reconnue.`);
            }
          }
          return;
        }
      });
    });

    setShoppingList(merged);
  }, [recipes]);

  return (
    <div className="max-w-3xl mx-auto bg-zinc-50 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Étape 2 : Je consulte ma liste des courses optimisée ! 🛒✨</h2>
      {Object.keys(shoppingList).length === 0 ? (
        <p className="text-gray-600">Aucun ingrédient à afficher</p>
      ) : (
        <ul className="space-y-2 text-gray-700">
          {Object.entries(shoppingList).map(([ingredient, data]) => {
            let displayValue = "";
            if (data.type === "number") {
              displayValue = formatQuantity(data.value);
            } else if (data.type === "unit") {
              displayValue = `${formatQuantity(data.value)} ${data.unit}`;
            } else if (data.type === "list") {
              displayValue = Array.from(data.items).sort().join(", ");
            }
            return (
              <li key={ingredient}>
                <span className="font-semibold">{ingredient}:</span> {displayValue}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
