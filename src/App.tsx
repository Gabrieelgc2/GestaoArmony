import { AppRoutes } from "./routes/AppRoutes";
import PwaInstallPrompt from "./components/pwa/PwaInstallPrompt";
import { AuthContextProvider } from "./contexts/AuthContext";
import { UpdatePrompt } from "./components/UpdatePrompt";

function App() {
  return (
    <>
    <AuthContextProvider>
      <UpdatePrompt />
      <AppRoutes />
      </AuthContextProvider>
      <PwaInstallPrompt />
    </>
  );
}

export default App;