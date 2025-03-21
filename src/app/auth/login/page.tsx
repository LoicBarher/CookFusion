"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Vérification du format de l'email en temps réel
  useEffect(() => {
    if (!email) {
      setEmailValid(null);
    } else {
      setEmailValid(EMAIL_REGEX.test(email));
    }
  }, [email]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    
    // On vérifie que l'email est correctement formaté avant d'envoyer la requête
    if (!emailValid) {
      setErrorMsg("Veuillez saisir un email correctement formaté.");
      return;
    }
    
    setSubmitting(true);
    try {
      const { error } = await signIn({ email, password });
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setErrorMsg("Les informations de connexion sont invalides. Veuillez vérifier votre email et votre mot de passe.");
        } else {
          setErrorMsg(error.message);
        }
        return;
      }
      router.push("/"); // Redirection après connexion réussie
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Erreur lors de la connexion.");
    } finally {
      setSubmitting(false);
    }
  };

  /* Attente prochaine version
  const handleResendConfirmation = async () => {
    // Vérifie que l'email est renseigné et valide avant d'envoyer la requête
    if (!email || !emailValid) {
      setErrorMsg("Veuillez saisir un email correctement formaté pour renvoyer la notification.");
      return;
    }
    setErrorMsg(null);
    try {
      const res = await fetch("/api/auth/resend-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Erreur lors de l'envoi du lien de confirmation.");
      } else {
        alert("Un nouvel e-mail de confirmation a été envoyé.");
      }
    } catch (err) {
      console.error("Resend error:", err);
      setErrorMsg("Erreur lors de l'envoi de la demande de confirmation.");
    }
  }; */

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Se connecter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium">
            Email{" "}
            {emailValid === true && <span className="text-green-500">✅</span>}
            {emailValid === false && <span className="text-red-500">❌</span>}
          </label>
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-xs"
          />
        </div>
        {/* Mot de passe */}
        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-xs"
          />
        </div>
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        <button
          type="submit"
          disabled={submitting}
          className={`self-center bg-blue-600 text-white py-2 px-4 rounded transition-colors focus:outline-none focus:bg-blue-700 ${
            submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {submitting ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={()=> true/*handleResendConfirmation*/} className="text-blue-600 underline">
          Renvoyer l’e-mail de confirmation
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Vous n’avez pas de compte ?{" "}
          <Link href="/auth/register" className="text-blue-600 underline">
            S’inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
