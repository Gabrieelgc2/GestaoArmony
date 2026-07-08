import { AppRoutes } from "./routes/AppRoutes";
import PwaInstallPrompt from "./components/pwa/PwaInstallPrompt";

function App() {
  return (
    <>
      <AppRoutes />
      <PwaInstallPrompt />
    </>
  );
}

export default App;