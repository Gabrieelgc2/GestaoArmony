import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/forms/Login";
import PainelPlanejador from "@/pages/Planejador/PainelPlanejador";
import PainelInspetor from "@/pages/Inspetor/Painel/Painel_Inspetor";
import { AuthContextProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";

export function AppRoutes() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<PrivateRoute allowedRoles={["PLANEJADOR"]} />}>
            <Route path="/planejador" element={<PainelPlanejador />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["INSPETOR"]} />}>
            <Route path="/inspetor" element={<PainelInspetor />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}