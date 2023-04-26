import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SidebarAdmin from "./SidebarAdmin";

const Admindash: React.FC = () => {
  const userDetails = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );
  return (
    <>
      <SidebarAdmin />
      <div className="dash-wrapper">
        {
          <h2>
            Welcome {userDetails?.firstName} !! You have{" "}
            {userDetails?.roles.join(", ")} roles
          </h2>
        }
      </div>
    </>
  );
};

export default Admindash;
