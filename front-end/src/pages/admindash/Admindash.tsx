import React from "react";
import SidebarAdmin from "./SidebarAdmin";
import { useLocation } from "react-router-dom";
import FeedbackForm1 from "../../components/form/FeedbackForm1";
import ReviewersConf from "../../components/form/ReviewersConf";

const Admindash: React.FC = () => {
  const { state } = useLocation();
  return (
    <>
      <SidebarAdmin />

      <div className="dash-wrapper">
        <h2>Welcome {state}</h2>
        <ReviewersConf />
        <FeedbackForm1 />
      </div>
    </>
  );
};

export default Admindash;
