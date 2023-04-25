import React from "react";
import SidebarAdmin from "./SidebarAdmin";
import { useLocation } from "react-router-dom";

const Admindash: React.FC = () => {
  const { state } = useLocation();
  return (
    <>
      <SidebarAdmin />

      <div className="dash-wrapper">
        <h2>Welcome {state}</h2>
      </div>
    </>
  );
};

export default Admindash;
