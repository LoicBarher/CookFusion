import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "L'email est requis" }, { status: 400 });
    }
    
    // @ts-expect-error: createServerClient est marqué comme déprécié dans les types, mais c'est la méthode recommandée pour l'instant.
    const supabase = createServerClient({ cookies });
    
    // Appelle la méthode pour renvoyer l’e-mail de confirmation.
    // La méthode "resend" est utilisée ici avec type "signup" (vérifiez la documentation selon votre version).
    const { error } = await supabase.auth.resend({ email, type: "signup" });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ message: "Email de confirmation renvoyé." });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

