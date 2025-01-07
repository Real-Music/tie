import HomePage from "@/pages/home";
import DailyPrayer from "@/pages/daily-prayer";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/daily-prayer", element: <DailyPrayer /> },
]);
export default router;
