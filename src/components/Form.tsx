"use client";
import React, { useState } from "react";
import { useRecipes } from "@/context/recipesContext";
import Image from "next/image";

export default function Form() {
  const { setRecipes } = useRecipes();
  const [count, setCount] = useState<string>("3");
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch(
        `/api/recipes?count=${count}&vegetarian=${isVegetarian}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des recettes");
      }
      const data = await response.json();
      setRecipes(data.recettes);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des recettes");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-2">
      <h3 className="text-2xl font-bold mb-6 text-blue-800">
        Étape 1 : Je choisis mes recettes 💡🍔
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="text-base font-medium  text-gray-700">
            Nombre de recettes
          </label>
          <input
          type="number"
          min="1"
          max="10"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          onBlur={(e) => {
            if (e.target.value.trim() === "" || Number(e.target.value) < 1) {
              setCount("1");
            }
          }}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isVegetarian}
            onChange={(e) => setIsVegetarian(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:outline-none focus:scale-105 hover:cursor-pointer"
          />
          <label className="text-base font-medium text-gray-700">
          Végétarien uniquement 🌿
          </label>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className={`self-center bg-blue-600 text-white py-2 px-4 min-w-36 rounded hover:bg-blue-800 focus:outline-none focus:bg-blue-800 transition-colors ${
            submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
          }`}
        >
          {submitting ? "Recherche en cours..." : "C'est parti !"}
        </button>


      </form>
      {loading && (
  <div className="flex flex-col justify-center items-center mt-6">
    <Image
      src="/loader.gif"
      alt="Chargement"
      width={48}
      height={48}
      className="animate-spin"
    />
    <p className="mt-2 text-gray-700 text-sm">Chargement en cours...</p>
  </div>
)}
{error && (
  <div className="flex justify-center items-center mt-4">
    <p className="text-red-500 text-sm">{error}</p>
  </div>
)}

    </div>
  );
}

/*<div className="flex justify-center items-center h-32">
<img src="/loader.gif" alt="Chargement" className="w-12 h-12 animate-spin" />*/