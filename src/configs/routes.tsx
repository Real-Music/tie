import AdminLogin from "@/pages/admin-login";
import DailyPrayer from "@/pages/daily-prayer";
import Dashboard from "@/pages/dashboard";
import HomePage from "@/pages/home";
import Registration from "@/pages/registration";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("@components/public-layout"),
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/daily-prayer",
    lazy: () => import("@components/private-layout"),
    children: [{ index: true, element: <DailyPrayer /> }],
  },
  { path: "/registration", element: <Registration /> },
  {
    path: "/admin-login",
    lazy: () => import("@components/pub-layout"),
    children: [{ index: true, element: <AdminLogin /> }],
  },
  {
    path: "/dashboard",
    lazy: () => import("@components/p-layout"),
    children: [{ index: true, element: <Dashboard /> }],
  },
]);

export default router;
