import React from "react";
import circle from "../../assets/circle-half.png";
import "./admindash.css";
import { NavLink, useLocation } from "react-router-dom";

const SidebarAdmin: React.FC = () => {
  const { state } = useLocation();
  return (
    <>
      <nav>
        <ul>
          <img className="circle" src={circle} alt="circle" />
          <h2 style={{ color: "white" }}>
            Welcome {state.firstName} !! You have {state.roles.join(", ")} roles
          </h2>
          <li>Status</li>
          <li>Feedback Requests</li>
          <li>
            <NavLink to="feedbackform">Feedback form</NavLink>
          </li>
        </ul>
      </nav>

      <div className="bottom-div">
        <span>Logged in as</span>
        <button></button>
      </div>
    </>
  );
};

export default SidebarAdmin;
