import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./store/authContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRouter from "./routes/publicRouter";
import { PrivateRouter } from "./routes/privateRouter";
import { ModalProvider } from "./store/modalContext";
import { ToastProvider } from "./store/toastContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <ToastProvider>
            <BrowserRouter>
              <PublicRouter />
              <PrivateRouter />
            </BrowserRouter>
          </ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
