"use client";

import ActiveLink from "@/components/ActiveLink";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

export default function Header() {
  const { user, signOut } = useAuth();

  // Classes par défaut et actives
  const defaultLinkClass =
    "group flex items-center justify-center gap-1 text-sm px-3 py-2 border border-white rounded transition-colors hover:bg-white hover:text-gray-900";
  const activeLinkClass = "active bg-white text-gray-900";

  return (
    <header className="bg-gray-900 text-white flex items-center justify-between p-4 shadow-md">
      {/* Zone gauche : Logo + Titre */}
      <div className="flex items-center gap-2">
        <ActiveLink
          href="/"
          className="flex items-center gap-1"
          activeClassName="active"
        >
          {/* Icône homepage */}
          <Image
            src="/images/svg/homepage.svg"
            alt="Homepage"
            width={25}
            height={25}
            className="transition-all group-hover:brightness-75"
          />
          {/* Titre visible à partir de sm (640px) */}
          <span className="hidden sm:inline-block text-2xl font-bold whitespace-nowrap">
            CookFusion
          </span>
        </ActiveLink>
      </div>

      {/* Zone droite : Navigation */}
      <nav className="flex items-center gap-2 whitespace-nowrap">
        {!user ? (
          <>
            {/* S'inscrire */}
            <ActiveLink
              href="/auth/register"
              className={defaultLinkClass}
              activeClassName={activeLinkClass}
            >
              <Image
                src="/images/svg/signup.svg"
                alt="S'inscrire"
                width={20}
                height={20}
                className="transition-all group-hover:brightness-75"
              />
              {/* Texte visible à partir de sm */}
              <span className="hidden sm:inline-block">{"S'inscrire"}</span>
            </ActiveLink>

            {/* Se connecter */}
            <ActiveLink
              href="/auth/login"
              className={defaultLinkClass}
              activeClassName={activeLinkClass}
            >
              <Image
                src="/images/svg/signin.svg"
                alt="Se connecter"
                width={20}
                height={20}
                className="transition-all group-hover:brightness-75"
              />
              <span className="hidden sm:inline-block">Se connecter</span>
            </ActiveLink>
          </>
        ) : (
          <div className="flex items-center gap-2">
            {/* Bonjour user (texte masqué en mobile) */}
            <span className="hidden sm:inline-block text-sm font-medium">
              Bonjour, {user.username || user.email} 👋
            </span>
            {/* Se déconnecter (bouton) */}
            <button
              onClick={async () => await signOut()}
              className={defaultLinkClass}
            >
              <Image
                src="/images/svg/signout.svg"
                alt="Se déconnecter"
                width={20}
                height={20}
                className="transition-all group-hover:brightness-75"
              />
              <span className="hidden sm:inline-block">Se déconnecter</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
