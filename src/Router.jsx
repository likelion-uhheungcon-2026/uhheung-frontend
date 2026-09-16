import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ServiceListPage from "./pages/ServiceListPage";
import OnboardingPage from "./pages/OnboardingPage";
import BoothDetailPage from "./pages/BoothDetailPage";

const hasVisited = localStorage.getItem("visited");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: hasVisited ? (
          <Navigate to="/home" replace />
        ) : (
          <OnboardingPage />
        ),
      },
      { path: "home", element: <HomePage /> },
      { path: "servicelist", element: <ServiceListPage /> },
      { path: "booth/:boothId", element: <BoothDetailPage /> },
    ],
  },
]);

export default router;
