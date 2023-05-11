import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ADMIN_ROLE } from "../common/constants";
import SidebarAdmin from "../pages/admindash/SidebarAdmin";
import SidebarUser from "../pages/userdash/SidebarUser";

const Main: React.FC = () => {
  const userDetails = useAppSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );

  return (
    <main className="global_wrapper">
      <div className="sidebar_wrapper">
        {userDetails?.roles.includes(ADMIN_ROLE) ? (
          <SidebarAdmin />
        ) : (
          <SidebarUser />
        )}
      </div>

      <div className="outlet_wrapper">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
