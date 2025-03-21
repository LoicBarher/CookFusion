import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const field = searchParams.get("field");
  const value = searchParams.get("value");

  if (!field || !value) {
    return NextResponse.json(
      { error: "Les paramètres 'field' et 'value' sont obligatoires." },
      { status: 400 }
    );
  }

  if (field !== "email" && field !== "username") {
    return NextResponse.json(
      { error: "Le champ spécifié n'est pas supporté." },
      { status: 400 }
    );
  }

  const supabase = supabaseServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq(field, value)
    .limit(1);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  // Si des données existent, cela signifie que le champ n'est pas unique
  const exists = data && data.length > 0;
  return NextResponse.json({ unique: !exists }, { status: 200 });
}
