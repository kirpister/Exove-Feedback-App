import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SidebarAdmin from "./SidebarAdmin";
import { useLocation } from 'react-router-dom';

const Admindash: React.FC = () => {


  const { state } = useLocation();


  const userDetails = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );

  return (
    <main>
      <SidebarAdmin />
      <div className="dash-wrapper">
        {
          <h2>
            Welcome {userDetails?.firstName} !! You have{" "}
            {userDetails?.roles.join(", ")} roles
          </h2>
        }
      </div>
    </main>
  );
};

export default Admindash;
