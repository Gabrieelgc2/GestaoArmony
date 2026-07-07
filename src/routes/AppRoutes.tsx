import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Planejador/Login/Login";
// import Painel from "../pages/Painel/Painel";
import DetalheProjeto from "../pages/Planejador/DetalhesProjeto/index";
import EditarProjeto from "../pages/Planejador/EditarProjeto";
import InstrucaoObra from "../pages/Planejador/LiberarTrabalho/InstrucaoObra";
import Instalacao from "../pages/Planejador/LiberarTrabalho/Instalacao";
import Medicao from "../pages/Planejador/LiberarTrabalho/Medicao";
import EntregaObra from "../pages/Planejador/LiberarTrabalho/EntregaObra";
import PosInstalacao from "../pages/Planejador/LiberarTrabalho/PosInstalacao";
import PreInstalacao from "../pages/Planejador/LiberarTrabalho/PreInstalacao";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/painel" element={<Painel />} /> */}
        <Route path="/detalheprojeto" element={<DetalheProjeto />} />
        <Route path="/editarprojeto" element={<EditarProjeto />} />
        <Route path="/instrucaoobra" element={<InstrucaoObra />} />
        <Route path="/instalacao" element={<Instalacao />} />
        <Route path="/medicao" element={<Medicao />} />
        <Route path="/entregaObra" element={<EntregaObra />} />
        <Route path="/posinstalacao" element={<PosInstalacao />} />
        <Route path="/preinstalacao" element={<PreInstalacao />} />
      </Routes>
    </BrowserRouter>
  );
}