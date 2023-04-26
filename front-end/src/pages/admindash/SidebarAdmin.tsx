import React from "react";
import circle from "../../assets/circle-half.png";
import "./admindash.css";
import { NavLink, useLocation } from "react-router-dom";

const SidebarAdmin: React.FC = () => {
  const { state } = useLocation();
  console.log("state", state);
  return (
    <>
      <nav>
        <ul>
          <img className="circle" src={circle} alt="circle" />
          {state ? (
            <h2 style={{ color: "white" }}>
              Welcome {state.firstName} !! You have {state.roles.join(", ")}{" "}
              roles
            </h2>
          ) : (
            ""
          )}
          {/* <li>Status</li>
          <li>Feedback Requests</li> */}
          <li>
            <NavLink to="/feedbackform">Feedback form</NavLink>
          </li>
          <li>
            <NavLink to="/conformation">Conformation</NavLink>
          </li>
          <li>
            <NavLink to="/allfeedbacks">All feedbacks</NavLink>
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
