import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./store/authContext";
import { BrowserRouter } from "react-router-dom";
import PublicRouter from "./routes/publicRouter";
import { PrivateRouter } from "./routes/privateRouter";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PublicRouter />
        <PrivateRouter/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
