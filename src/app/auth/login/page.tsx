"use client";

export default function Page() {
  return (
    <div>En construction...</div>
  )
}

/*"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function LoginPage() {
  const { signIn } = useAuth();      // Méthode fournie par AuthContext
  const router = useRouter();        // Pour rediriger après connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    // On appelle signIn pour se connecter
    const { error } = await signIn(email, password);
    if (error) {
      // Si Supabase renvoie une erreur (ex: mauvais mot de passe)
      setErrorMsg(error.message);
      return;
    }

    // Si tout va bien, on redirige l'utilisateur
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Se connecter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
*/