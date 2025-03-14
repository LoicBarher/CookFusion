import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1 container mx-auto p-6">
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
