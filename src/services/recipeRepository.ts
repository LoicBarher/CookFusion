import { Recipe } from "@/context/recipesContext";
import { supabase } from "@/lib/supabaseClient";

// export async function getRecipes(): Promise<Recipe[]> {
//   const { data, error } = await supabase
//     .from("recettes")
//     .select("*");

//     if (error) {
//       console.error("Erreur lors de la récupération des recettes", error);
//       return [];
//     }

//     return data as Recipe[];
// }

export async function getFilteredRecipes(count: number, isVegetarian: boolean): Promise <Recipe[]> {
  let query = supabase
    .from("recettes")
    .select("*");
  
  if (isVegetarian) {
    query = query.eq("vegetarien", true);
  }
  
  const { data, error } = await query;
  console.log("data", data);
  if(error) {
    console.error("Erreur lors de la récupération des recettes filtrées", error);
    return [];
  }
  
  const recipes = data as Recipe[];
  
  recipes.sort(() => Math.random() - 0.5);
  return recipes.slice(0, count);
}
