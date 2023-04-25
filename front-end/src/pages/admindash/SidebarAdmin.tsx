import React from "react";
import circle from "../../assets/circle-half.png";
import { NavLink } from "react-router-dom";

const SidebarAdmin: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <img className="circle" src={circle} alt="circle" />
          <li>Whatever</li>
          <li>
            <NavLink to="revconf">Rev-w conformation</NavLink>
          </li>
          <li>
            <NavLink to="feedbackform">New feedback form</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdmin;
