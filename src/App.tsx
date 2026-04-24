import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/AppRouter";

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
