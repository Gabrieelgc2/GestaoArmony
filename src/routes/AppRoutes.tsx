import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Planejador/Login/Login";
// import PainelInstalador from "../pages/Instalador/Painel";
// import PainelInspetor from "../pages/Inspetor/Painel";
import PainelProjetos from "@/pages/Planejador/PainelProjeto";
import Projeto from "@/pages/Planejador/Projeto";

export function AppRoutes() {
  return (
 <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />

    <Route
      path="/painel"
      element={<PainelProjetos />}
    />

    <Route
      path="/projeto/:id"
      element={<Projeto />}
    />

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