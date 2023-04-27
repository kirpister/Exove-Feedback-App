import React from "react";
import "./userdash.css";
import circle from "../../assets/circle-half.png";

const SidebarUser: React.FC = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <img className="circle" src={circle} alt="circle" />
          <li>Feedback Requests</li>
          <li>Request Feedback</li>
        </ul>
      </nav>

      <div className="bottom-div">
        <span>Logged in as</span>
        <button></button>
      </div>
    </div>
  );
};

export default SidebarUser;
