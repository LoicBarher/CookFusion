import { NextResponse } from "next/server";

export function middleware(req: Request) {
  console.log("✅ Middleware exécuté pour :", req.url);
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // Appliquer à toutes les pages
};