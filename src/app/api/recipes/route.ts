import { NextResponse } from "next/server";
import { getFilteredRecipes } from "@/services/recipeRepository";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get("count") || "3", 10);
  const vegetarian = searchParams.get("vegetarian") === "true";

  try {
    const recipes = await getFilteredRecipes(count, vegetarian);
    return NextResponse.json(
      { recettes: recipes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans GET /api/recipes !", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des recettes" },
      { status: 500 }
    );
  }
}
