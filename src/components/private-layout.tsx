import useAppStore from "@/store";
import { Navigate } from "react-router-dom";
import DefaultLayout from "./default-layout";

function PrivateLayout() {
  const { name, profileImg } = useAppStore();
  const isLoggedIn = name && profileImg;

  return isLoggedIn ? <DefaultLayout /> : <Navigate to="/" replace />;
}

export const Component = PrivateLayout;
export default PrivateLayout;
