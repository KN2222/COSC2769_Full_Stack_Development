import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./store/authContext";
import { BrowserRouter } from "react-router-dom";
import PublicRouter from "./routes/router";


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <PublicRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
