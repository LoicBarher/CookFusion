import { createClient } from "@supabase/supabase-js"
import { Recipe } from "@/context/recipesContext";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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
