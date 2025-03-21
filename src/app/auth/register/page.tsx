"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";

// Regex de validation pour le username et le password
const USERNAME_REGEX = /^[a-zA-Z0-9]{6,25}$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,25}$/;

async function checkUnique(field: "email" | "username", value: string): Promise<boolean> {
  if (!value) return true;
  try {
    const res = await fetch(`/api/auth/check-unique?field=${field}&value=${value}`);
    const data = await res.json();
    return data.unique;
  } catch (error) {
    console.error("Erreur de checkUnique:", error);
    return false;
  }
}

export default function RegisterPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  // Champs du formulaire
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // États de validation
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [repeatPasswordValid, setRepeatPasswordValid] = useState<boolean | null>(null);

  // Feedback global
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Etat pour désactiver le bouton de soumission
  const [submitting, setSubmitting] = useState(false);

  // Validation du format du username
  useEffect(() => {
    if (!username) {
      setUsernameValid(null);
      return;
    }
    setUsernameValid(USERNAME_REGEX.test(username));
  }, [username]);

  // Validation du format du password
  useEffect(() => {
    if (!password) {
      setPasswordValid(null);
      return;
    }
    setPasswordValid(PASSWORD_REGEX.test(password));
  }, [password]);

  // Validation du repeat password (doit correspondre au password)
  useEffect(() => {
    if (!repeatPassword) {
      setRepeatPasswordValid(null);
      return;
    }
    setRepeatPasswordValid(password === repeatPassword);
  }, [password, repeatPassword]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      // Vérification finale du format
      if (!usernameValid || !email || !passwordValid || !repeatPasswordValid) {
        setErrorMsg("Veuillez corriger les erreurs de format dans le formulaire.");
        return;
      }

      // Vérification d'unicité lors de la soumission
      const isUsernameUnique = await checkUnique("username", username);
      const isEmailUnique = await checkUnique("email", email);
      if (!isUsernameUnique || !isEmailUnique) {
        setErrorMsg("Le nom d'utilisateur ou l'email existe déjà.");
        return;
      }

      // Appel à signUp (fonction dans AuthContext)
      const { error } = await signUp({
        email,
        password,
        metadata: { username },
      });
      if (error) {
        if (error.message.includes("No API key found")) {
          setErrorMsg("L'inscription a échoué 😕. Ce n'est pas de votre faute, merci de contacter le webmaster.");
        } else {
          setErrorMsg(error.message);
        }
        return;
      }
      setSuccessMsg("Un e-mail de confirmation vous a été envoyé. Veuillez vérifier votre boîte mail.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur lors de la création du compte.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-2 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Username */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            {"Nom d'utilisateur"}{" "}
            {usernameValid === true && <span className="text-green-500">✅</span>}
            {usernameValid === false && <span className="text-red-500">❌</span>}
          </label>
          <input
            type="text"
            placeholder="Nom d'utilisateur (6-25 caractères alphanum.)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-xs"
            required
          />
        </div>
        {/* Email */}
        <EmailInput value={email} onChange={setEmail} label="Email" />
        {/* Password */}
        <PasswordInput
          value={password}
          onChange={setPassword}
          label="Mot de passe"
          placeholder="6-25 caractères, 1 chiffre, 1 caractère spécial"
        />
        {/* Repeat Password */}
        <PasswordInput
          value={repeatPassword}
          onChange={setRepeatPassword}
          label="Confirmer le mot de passe"
          placeholder="Répétez le mot de passe"
        />
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}
        <button
          type="submit"
          disabled={submitting}
          className={`self-center bg-blue-600 text-white py-2 px-4 rounded transition-colors focus:outline-none focus:bg-blue-800 ${
            submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
          }`}
        >
          {submitting ? "Envoi en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
