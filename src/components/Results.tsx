"use client";
import React from "react";
import { useRecipes } from "@/context/recipesContext";
import Image from "next/image";
import { parseQuantityAndUnit, formatQuantity } from "@/utils/quantityUtils";

function adjustIngredient(rawQty: number | string, factor: number): string {
  if (typeof rawQty === "number") {
    const adjusted = Math.ceil(rawQty * factor);
    return adjusted.toString();
  }
  if (typeof rawQty === "string") {
    const parsed = parseQuantityAndUnit(rawQty);
    if (parsed) {
      const adjusted = Math.ceil(parsed.qty * factor);
      return `${formatQuantity(adjusted)} ${parsed.unit}`;
    }
    // Pour "condiments" ou autres valeurs non numériques, on retourne la chaîne brute.
    return rawQty;
  }
  return "";
}

interface ResultsProps {
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onReplaceRecipe: (id: number) => void;
}

export default function Results({ onIncrement, onDecrement, onReplaceRecipe }: ResultsProps) {
  const { recipes } = useRecipes();
  if (recipes.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => {
          const factor = (recipe.selectedPeople ?? recipe.personnes) / recipe.personnes;
          const nbPersonnes = recipe.selectedPeople ?? recipe.personnes;
          return (
            <div
              key={recipe.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden 
             animate-fadeIn transition-opacity duration-700 
             hover:scale-105 hover:transition-transform hover:duration-200 cursor-pointer"
            >
              <button
                onClick={() => onReplaceRecipe(recipe.id)}
                className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 z-1"
              >
                Changer
              </button>
              <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
                <div className="flex-1">
                  <Image
                    src={recipe.photo}
                    alt={recipe.titre}
                    width={200}
                    height={200}
                    className="w-full h-auto object-cover rounded"
                  />
                  <h3 className="mt-2 text-xl font-bold tracking-wide text-gray-800">
                    {recipe.titre}
                  </h3>
                  <div className="mt-2">
                    <ul className="text-sm text-gray-600">
                      {Object.entries(recipe.ingredients).map(([key, value]) => {
                        if (key === "condiments") {
                          return <li key={key}>{key}: {value}</li>;
                        }
                        const adjustedValue = adjustIngredient(value, factor);
                        return <li key={key}>{key}: {adjustedValue}</li>;
                      })}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onDecrement(recipe.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
                    >
                      –
                    </button>
                    <span className="font-semibold">{nbPersonnes} pers.</span>
                    <button
                      onClick={() => onIncrement(recipe.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
                    >
                      +
                    </button>
                  </div>
                  <a
                    href={recipe.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 text-center bg-blue-600 hover:bg-blue-800 text-white py-2 rounded transition-colors"
                  >
                    Voir la recette
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ); 
}