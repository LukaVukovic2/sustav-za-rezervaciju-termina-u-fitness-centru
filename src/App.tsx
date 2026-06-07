import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/AppRouter";
import "./styles/index.css";
import Korisnici from "./pages/KorisniciPage";

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
