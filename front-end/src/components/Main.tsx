import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ADMIN_ROLE } from "../common/constants";
import SidebarAdmin from "../pages/admindash/SidebarAdmin";
import SidebarUser from "../pages/userdash/SidebarUser";
import { getAllRequestUserListAPI } from "../features/requestUserListSlicer";
import { getAllFeedbackAPI } from "../features/createdFeedbackSlicer";
import { getAllUserAPI } from "../features/alluserSlicer";

const Main: React.FC = () => {
  const { userDetails } = useAppSelector((state) => state.authenticatedUser);
  const { notifications } = useAppSelector((state) => state.userNotifications);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('outlet')
    dispatch(getAllRequestUserListAPI());
    dispatch(getAllFeedbackAPI());
    dispatch(getAllUserAPI());
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
