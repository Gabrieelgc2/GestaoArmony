import { UserAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { session } = UserAuth();
  console.log("Sessão atual no PrivateRoute:", session);

  if (session === undefined) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-800 border-t-transparent" />
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/"/>;
}