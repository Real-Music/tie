import HomePage from "@/pages/home";
import DailyPrayer from "@/pages/daily-prayer";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/components/public-layout";
import PrivateLayout from "@/components/private-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/daily-prayer",
    element: <PrivateLayout />,
    children: [{ index: true, element: <DailyPrayer /> }],
  },
]);
export default router;
