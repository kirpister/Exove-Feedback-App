import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ADMIN_ROLE } from "../common/constants";
import SidebarAdmin from "../pages/admindash/SidebarAdmin";
import SidebarUser from "../pages/userdash/SidebarUser";

const Main: React.FC = () => {
  const userDetails = useAppSelector((state: RootState) => state.authenticatedUser.userDetails);

  return (
    <main className="global_wrapper">
      {userDetails?.roles.includes(ADMIN_ROLE) ? <SidebarAdmin /> : <SidebarUser />}
      <Outlet />
    </main>
  );
};

export default Main;
