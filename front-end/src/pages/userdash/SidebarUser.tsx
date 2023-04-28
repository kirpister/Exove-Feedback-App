import React from "react";
import "./userdash.css";
import circle from "../../assets/circle-half.png";
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { initiateLogoutSession } from "../../features/authenticatedUserSlice";

const SidebarUser: React.FC = () => {

  const dispatch = useAppDispatch();

  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );

  return (
    <>
    <div className="sidebar">
      <nav>
        <ul>
          <img className="circle" src={circle} alt="circle" />
          <NavLink to="/"><li>Main</li></NavLink>
          <li>Feedback Requests</li>
          <NavLink to="/requestfeedback"><li>Request Feedback</li></NavLink>
        </ul>
      </nav>
      </div>
      
      <div className="bottom-div">

      <div className="avatar">
      {userDetails.firstName.charAt(0).toUpperCase()}
      </div>
        <span>{userDetails.firstName} {userDetails.surName}</span>
    
        <p
          onClick={() => {
            dispatch(initiateLogoutSession());
          }}
        >LOG OUT</p>
      </div>
      </>
  );
};

export default SidebarUser;
