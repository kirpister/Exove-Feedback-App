import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ADMIN_ROLE } from "../common/constants";
import SidebarAdmin from "../pages/admindash/SidebarAdmin";
import SidebarUser from "../pages/userdash/SidebarUser";
import { getAllRequestUserListAPI } from "../features/requestUserListSlicer";
import { getAllFeedbackAPI } from "../features/createdFeedbackSlicer";
import { getAllUserAPI } from "../features/alluserSlicer";
import { getPersonalDetailAPI } from "../features/authenticatedUserSlice";
import { showLoading2s } from "../features/loadingSlicer";

const Main: React.FC = () => {
  const { userDetails } = useAppSelector((state) => state.authenticatedUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    showLoading2s(dispatch)
    dispatch(getAllRequestUserListAPI());
    dispatch(getAllFeedbackAPI());
    dispatch(getAllUserAPI());
    dispatch(getPersonalDetailAPI());
  }, [dispatch]);
  return (
    <main className="global_wrapper">
      <div className="sidebar_wrapper">{userDetails?.roles.includes(ADMIN_ROLE) ? <SidebarAdmin /> : <SidebarUser />}</div>
      <div className="outlet_wrapper">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
