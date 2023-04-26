import React from "react";
import "./userdash.css";
import circle from "../../assets/circle-half.png";
import { useAppDispatch } from "../../app/hooks";
import { initiateLogoutSession } from "../../features/authenticatedUserSlice";

const SidebarUser: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="sidebaruser">
      <nav>
        <ul>
          <img className="circle" src={circle} alt="circle" />
          <li>Feedback Requests</li>
          <li>Request Feedback</li>
        </ul>
      </nav>

      <div className="bottom-div">
        <span>Logged in as</span>
        <button
          onClick={() => {
            dispatch(initiateLogoutSession());
          }}
        ></button>
      </div>
    </div>
  );
};

export default SidebarUser;
