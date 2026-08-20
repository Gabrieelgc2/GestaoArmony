import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../supabaseClient";

export type UserRole = "PLANEJADOR" | "INSPETOR";

export interface UserProfile {
  id: string;
  full_name: string;
  role: UserRole;
}

interface AuthContextType {
  session: any;
  profile: UserProfile | null;
  loading: boolean;
  LoadRole: (userId: string) => Promise<void>
  signInUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  signOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<any>(undefined);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // LoadRole
  const LoadRole = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", userId)
        .single()
      console.log("Perfil vindo do banco:", data);
      console.log("Role real:", data?.role);
      setProfile(data || null);
    } catch {
      setProfile(null);
    }
  };
  // Sign in
  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password: password,
      });

      if (error) {
        console.log("Sign-in error: ", error.message);
        return { success: false, error: error.message };
      }

      console.log("Sign-in success:", data);
      return { success: true, data };
    } catch (error: any) {
      console.error("Unexpected error during sign-in:", error?.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  useEffect(() => {
    // 1. Busca a sessão salva no navegador (F5 / Inicialização)
    const checkInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        if (session?.user) {
          await LoadRole(session.user.id);
        }
      } catch (err) {
        console.error("Erro na checagem inicial:", err);
      } finally {
        setLoading(false);
      }
    };

    void checkInitialSession();

    // 2. Escuta alterações em tempo real (login, logout, refresh de token)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          await LoadRole(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // 3. Cleanup: Desliga o ouvinte ao desmontar
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Fecha o useEffect aqui no final!

  // Sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error signing out:", error);
    }
    setSession(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider
      value={{ signInUser, session, signOut, profile, loading, LoadRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UserAuth deve ser usado dentro de um AuthContextProvider");
  }

  return context;
};