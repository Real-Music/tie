import useAdminStore from "@/stores/admin-store";
import { Navigate } from "react-router-dom";
import DefaultLayout from "./default-layout";

function PLayout() {
  const { isLoggedIn } = useAdminStore();
  return isLoggedIn ? (
    <DefaultLayout />
  ) : (
    <Navigate to="/admin-login" replace />
  );
}

export const Component = PLayout;
export default PLayout;
