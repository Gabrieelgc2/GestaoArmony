import { Navigate, Outlet } from "react-router-dom";
import { UserAuth, type UserRole } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  allowedRoles?: UserRole[];
}

export default function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { session, profile, loading } = UserAuth();

  // 1. Enquanto carrega a sessão ou busca o profile no Supabase
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  // 2. Não está autenticado -> manda para o login
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // 3. Checagem de Cargo: se a rota exige cargos específicos e o usuário não tem o cargo certo
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Redireciona o usuário para o painel correto dele
    const rotaCorreta = profile.role === "PLANEJADOR" ? "/planejador" : "/inspetor";
    return <Navigate to={rotaCorreta} replace />;
  }

  // 4. Liberado: renderiza o painel filho
  return <Outlet />;
}