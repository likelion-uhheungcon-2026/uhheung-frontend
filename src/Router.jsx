import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ServiceListPage from "./pages/ServiceListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/servicelist", element: <ServiceListPage /> },
    ],
  },
]);

export default router;
