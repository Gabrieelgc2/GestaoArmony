import Checkbox from "../Checkbox/Checkbox";
import Input from "../ui/Input/Input";
import { Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";
import { UserAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ButtonConfirm from "../ui/Button/ButtonConfirm";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const { signInUser, profile, loading } = UserAuth();

// 1. Enquanto carrega a sessão/perfil, mostra o spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  // 2. Se já estiver logado, redireciona declarativamente no JSX
  if (profile?.role === "PLANEJADOR") {
    return <Navigate to="/planejador" replace />;
  }

  if (profile?.role === "INSPETOR") {
    return <Navigate to="/inspetor" replace />;
  }

  const handleSignIn = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErrorMessage(null); // Limpa erros anteriores

    // 1. Chama o signInUser usando a estrutura { success, error }
    const result = await signInUser(email, password);

    // 2. Verifica o resultado
    if (!result.success) {
      setErrorMessage("Erro ao realizar login.");
      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setCarregando(false);
      return;
    } 
  }
    if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSignIn} className="space-y-6">
      {errorMessage && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
          {errorMessage}
        </div>
      )}

      <Input
        label="E-mail"
        placeholder="name@company.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail size={18} />}
        required
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock size={18} />}
        rightIcon={<Eye size={18} />}
        required
      />

      <div className="flex justify-between items-center">
        <Checkbox label="Lembrar-me" />

        <a href="#" className="text-blue-800 text-sm hover:underline">
          Esqueceu sua senha?
        </a>
      </div>
      <ButtonConfirm type="submit" disabled={carregando}>
        {carregando ? "Entrando..." : "Entrar →"}
      </ButtonConfirm>
    </form>
  );
}