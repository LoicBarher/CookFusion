"use client";
import { JSX } from "react";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/client";
import type { Session, User as SupabaseUser, AuthError, AuthChangeEvent } from "@supabase/supabase-js";

// Définition de l'utilisateur de l'application.
export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

// On définit le type de réponse pour nos méthodes d'authentification.
export interface AuthResponse {
  data: { user: SupabaseUser | null; session: Session | null };
  error: AuthError | null;
}

// Interface pour le contexte d'authentification.
export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (params: { email: string; password: string; metadata?: Record<string, unknown> }) => Promise<AuthResponse>;
  signIn: (params: { email: string; password: string }) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(
        session?.user
          ? {
              id: session.user.id,
              email: session.user.email!,
              username: session.user.user_metadata.username || "",
              role: session.user.user_metadata.role || "user",
            }
          : null
      );
      setLoading(false);
    };
    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        setUser(
          session?.user
            ? {
                id: session.user.id,
                email: session.user.email!,
                username: session.user.user_metadata.username || "",
                role: session.user.user_metadata.role || "user",
              }
            : null
        );
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Adaptation pour Supabase v2 : signUp prend un seul objet avec email, password et options
  const signUp = ({
    email,
    password,
    metadata,
  }: {
    email: string;
    password: string;
    metadata?: Record<string, unknown>;
  }): Promise<AuthResponse> =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });

  const signIn = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
