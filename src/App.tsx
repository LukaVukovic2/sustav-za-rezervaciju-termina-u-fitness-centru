import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/AppRouter";
import "./styles/index.css";

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
