import { AppRoutes } from "./routes/AppRoutes";
import PwaInstallPrompt from "./components/pwa/PwaInstallPrompt";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
    <AuthContextProvider>
      <AppRoutes />
      </AuthContextProvider>
      <PwaInstallPrompt />
    </>
  );
}

export default App;