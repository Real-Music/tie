import { Navigate } from "react-router-dom";
import DefaultLayout from "./default-layout";
import useAdminStore from "@/stores/admin-store";

function PublicLayout() {
  const { isLoggedIn } = useAdminStore();
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <DefaultLayout />;
}

export const Component = PublicLayout;
export default PublicLayout;
