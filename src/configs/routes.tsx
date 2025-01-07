import DailyPrayer from "@/pages/daily-prayer";
import HomePage from "@/pages/home";
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
]);

export default router;
