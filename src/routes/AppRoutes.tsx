import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/forms/Login";
import PainelPlanejador from "@/pages/Planejador/PainelPlanejador";
import { AuthContextProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import { PainelInspetor } from "@/pages/Inspetor/Painel/PainelInspetor";
import AgendaPlanejadorPage from "@/pages/Planejador/Calendario/AgendaPlanejador";
import EsquecerSenha from "@/components/forms/EsquecerSenha";
import { AdministracaoPage } from "@/pages/Administrador/main";

export function AppRoutes() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/esquecer" element={<EsquecerSenha />} />
          <Route element={<PrivateRoute allowedRoles={["planejador"]} />}>
            <Route path="/planejador" element={<PainelPlanejador />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["engenheiro"]} />}>
            <Route path="/inspetor" element={<PainelInspetor />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["planejador"]} />}>
            <Route path="/planejador/agenda" element={<AgendaPlanejadorPage />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["master"]} />}>
            <Route path="/administrador" element={<AdministracaoPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}