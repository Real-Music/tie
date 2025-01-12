import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/toaster";

function DefaultLayout() {
  return (
    <>
      <Toaster />
      <Outlet />;
    </>
  );
}

export default DefaultLayout;
