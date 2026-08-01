import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Planejador/Login/Login";
// import PainelInstalador from "../pages/Instalador/Painel";
// import PainelInspetor from "../pages/Inspetor/Painel";
import Projeto from "@/pages/Planejador/Projeto";
import PrivateRoute from "@/components/PrivateRoute";
import ProjectTable from "@/pages/Planejador/Projetos/ProjectTable";

export function AppRoutes() {
  return (
 <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    
    <Route element={<PrivateRoute />}>
    <Route
    path="/painel"
    element={<ProjectTable />}
    />
    <Route
      path="/projeto/:id"
      element={<Projeto />}
    />
    </Route>

    {/* <Route
      path="/instalador/painel"
      element={<PainelInstalador />}
    /> */}

    {/* <Route
      path="/inspetor/painel"
      element={<PainelInspetor />}
    /> */}
  </Routes>
</BrowserRouter>
  );
}