import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./store/authContext";
import { BrowserRouter } from "react-router-dom";
import PublicRouter from "./routes/publicRouter";
import { PrivateRouter } from "./routes/privateRouter";
import { ModalProvider } from "./store/modalContext";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <PublicRouter />
          <PrivateRouter />
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
