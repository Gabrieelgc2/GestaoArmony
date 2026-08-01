import Checkbox from "../Checkbox/Checkbox";
import Input from "../ui/Input/Input";
import { Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";
import { UserAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ButtonConfirm from "../ui/Button/ButtonConfirm";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Limpa erros anteriores

    // 1. Chama o signInUser usando a estrutura { success, error }
    const result = await signInUser(email, password);

    setLoading(false);

    // 2. Verifica o resultado
    if (result.success) {
      // Redireciona para a página interna
      navigate("/painel");
    } else {
      // Exibe a mensagem de erro retornada
      setErrorMessage("Erro ao realizar login.");

      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

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
      <ButtonConfirm type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar →"}
      </ButtonConfirm>
    </form>
  );
}