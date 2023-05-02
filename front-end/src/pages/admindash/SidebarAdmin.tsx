import React from "react";
import circle from "../../assets/circle-half.png";
import "./admindash.css";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { initiateLogoutSession } from "../../features/authenticatedUserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const SidebarAdmin: React.FC = () => {
  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );

  const dispatch = useAppDispatch();

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <img className="circle" src={circle} alt="circle" />

          <li>
            <NavLink to="/feedbackform">Feedback form</NavLink>
          </li>
          <li>
            <NavLink to="/confirmation">Conformation</NavLink>
          </li>
          <li>
            <NavLink to="/allfeedbacks">All feedbacks</NavLink>
          </li>
        </ul>
      </nav>

      <div className="bottom-div">
        <div className="avatar">
          {userDetails.firstName.charAt(0).toUpperCase()}
        </div>
        <span>
          {userDetails.firstName} {userDetails.surName}
        </span>

        <p
          onClick={() => {
            dispatch(initiateLogoutSession());
          }}
        >
          LOG OUT
        </p>
      </div>
    </div>
  );
};

export default SidebarAdmin;
