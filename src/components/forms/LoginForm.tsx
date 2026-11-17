import Input from "../ui/Input/Input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  UserAuth,
} from "@/contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ButtonConfirm from "../ui/Button/ButtonConfirm";
import Select from "../ui/SelectInput";
import {
  isUserRole,
  roleHomeRoutes,
  roleLabels,
} from "@/utils/userRoles";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const {
    signInUser,
    session,
    profile,
    activeRole,
    setActiveRole,
    loading,
    signOut,
  } = UserAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (session && profile?.length === 1 && activeRole) {
    return <Navigate to={roleHomeRoutes[activeRole]} replace />;
  }

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCarregando(true);
    setErrorMessage(null);

    const result = await signInUser(email, password);
    if (!result.success) {
      setErrorMessage("Erro ao realizar login.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
    setCarregando(false);
  };

  const handleSelectRole = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeRole || !profile?.some((item) => item.perfil_codigo === activeRole)) {
      setErrorMessage("Selecione um perfil associado à sua conta.");
      return;
    }
    navigate(roleHomeRoutes[activeRole], { replace: true });
  };

  if (session && profile && profile.length > 1) {
    const availableRoles = profile.map((item) => item.perfil_codigo);
    return (
      <form onSubmit={handleSelectRole} className="space-y-6">
        <label htmlFor="login-role" className="block text-sm font-medium text-slate-700">
          Entrar como
        </label>
        <Select
          id="login-role"
          placeholder="Selecione um perfil"
          options={availableRoles.map((role) => ({
            value: role,
            label: roleLabels[role],
          }))}
          value={activeRole ?? ""}
          onChange={(value) => {
            if (isUserRole(value) && availableRoles.includes(value)) {
              setActiveRole(value);
            }
            setErrorMessage(null);
          }}
        />
        {errorMessage && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
            {errorMessage}
          </div>
        )}
        <ButtonConfirm type="submit" disabled={!activeRole}>
          Continuar →
        </ButtonConfirm>
        <button
          type="button"
          onClick={() => void signOut()}
          className="w-full text-sm text-blue-800 hover:underline"
        >
          Sair
        </button>
      </form>
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
        id="login-email"
        label="E-mail"
        placeholder="name@company.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail size={18} />}
        required
      />

      <Input
        id="login-password"
        label="Senha"
        type={mostrarSenha ? "text" : "password"}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock size={18} />}
        rightIcon={mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
        onRightIconClick={() => setMostrarSenha((visivel) => !visivel)}
        rightIconLabel={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
        required
      />

      <div className="flex justify-between items-center">

        <Link to="/esquecer" className="text-blue-800 text-sm hover:underline">
          Esqueceu sua senha?
        </Link>
      </div>
      <ButtonConfirm type="submit" disabled={carregando}>
        {carregando ? "Entrando..." : "Entrar →"}
      </ButtonConfirm>
    </form>
  );
}