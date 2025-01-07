import useAppStore from "@/store";
import { Navigate } from "react-router-dom";
import DefaultLayout from "./default-layout";

function PublicLayout() {
  const { name, profileImg } = useAppStore();
  const isLoggedIn = name && profileImg;

  return isLoggedIn ? (
    <Navigate to="/daily-prayer" replace />
  ) : (
    <DefaultLayout />
  );
}

export const Component = PublicLayout;
export default PublicLayout;
