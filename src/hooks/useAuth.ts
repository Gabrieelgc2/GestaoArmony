import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

export function useAuth() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      setIsLoggingOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);

      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { signOut, isLoggingOut };
}