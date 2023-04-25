import React from "react";
import circle from "../../assets/circle-half.png";
import "./admindash.css";

const SidebarAdmin: React.FC = () => {
  return (
    <>
      <nav>
        <ul>
          <img className="circle" src={circle} alt="circle" />
          <li>Status</li>
          <li>Feedback Requests</li>
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
