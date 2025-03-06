import fs from "fs";
import path from "path";
import { Recipe } from "@/context/recipesContext";

export function getRecipes(): Recipe[] {
  const filePath = path.join(process.cwd(), "src", "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data.recettes;
}

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function getFilteredRecipes(count: number, isVegetarian: boolean): Recipe[] {
  let recipes = getRecipes();
  if (isVegetarian) {
    recipes = recipes.filter(recipe => recipe.vegetarien);
  }
  
  recipes = shuffleArray(recipes);

  return recipes.slice(0, count);
}
