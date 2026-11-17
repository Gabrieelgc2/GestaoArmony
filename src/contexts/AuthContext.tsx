import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import type { UserRole } from "@/utils/userRoles";
export type { UserRole } from "@/utils/userRoles";

export interface UserProfile {
  usuario_id: string;
  perfil_codigo: UserRole;
}

interface AuthContextType {
  session: Session | null;
  profile: UserProfile[] | null;
  activeRole: UserRole | null;
  setActiveRole: (role: UserRole | null) => void;
  loading: boolean;
  LoadRole: (userId: string) => Promise<void>;
  signInUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile[] | null>(null);
  const [activeRole, setActiveRoleState] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const setActiveRole = useCallback((role: UserRole | null) => {
    setActiveRoleState(role);
  }, []);

  const LoadRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("usuario_perfil")
        .select("usuario_id, perfil_codigo")
        .eq("usuario_id", userId);
      if (error) {
        throw error;
      }

      const roles = (data || []).filter(
        (item): item is UserProfile =>
          item.perfil_codigo === "planejador" ||
          item.perfil_codigo === "engenheiro" ||
          item.perfil_codigo === "master"
      );
      setProfile(roles);

      setActiveRoleState((currentRole) => {
        if (roles.some((item) => item.perfil_codigo === currentRole)) {
          return currentRole;
        }
        return roles.length === 1 ? roles[0].perfil_codigo : null;
      });
    } catch (error) {
      console.error("Erro ao carregar perfis do usuário:", error);
      setProfile(null);
      setActiveRole(null);
    }
  }, [setActiveRole]);

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

      if (data.user) {
        await LoadRole(data.user.id);
      }
      return { success: true };
    } catch (error: unknown) {
      console.error(
        "Unexpected error during sign-in:",
        error instanceof Error ? error.message : error
      );
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
        } else {
          setProfile(null);
          setActiveRole(null);
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
          setActiveRole(null);
        }
      }
    );

    // 3. Cleanup: Desliga o ouvinte ao desmontar
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [LoadRole, setActiveRole]);

  // Sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error signing out:", error);
    }
    setSession(null);
    setProfile(null);
    setActiveRole(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signInUser,
        session,
        signOut,
        profile,
        activeRole,
        setActiveRole,
        loading,
        LoadRole,
      }}
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