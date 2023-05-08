import React, { useEffect } from "react";
import circle from "../../assets/circle-half.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { initiateLogoutSession } from "../../features/authenticatedUserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import classes from "./Admindash.module.css";
import { getAllRequestUserListAPI } from "../../features/requestUserListSlicer";
import { getAllFeedbackAPI } from "../../features/createdFeedbackSlicer";
import { getAllUserAPI } from "../../features/alluserSlicer";

const SidebarAdmin: React.FC = () => {
  const userDetails: any = useSelector((state: RootState) => state.authenticatedUser.userDetails);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
useEffect(()=> { 
    dispatch(getAllRequestUserListAPI());
    dispatch(getAllFeedbackAPI());
    dispatch(getAllUserAPI());
},[dispatch])
  return (
    <div className={classes.sidebar}>
      <nav className={classes.usernav}>
        <ul>
          <NavLink to={"/"}>
            <img className="circle" src={circle} alt="circle" />
          </NavLink>
          <li>
            <NavLink to="/notifications">notifications</NavLink>
          </li>
          <li>
            <NavLink to="/feedbackform">feedbackform</NavLink>
          </li>
          <li>
            <NavLink to="/getuserlist">Get Request User List</NavLink>
          </li>
          <li>
            <NavLink to="/allfeedbacks">All feedbacks</NavLink>
          </li>
        </ul>
      </nav>

      <div className={classes.bottomdiv}>
        <div className={classes.avatar}>{userDetails.firstName.charAt(0).toUpperCase()}</div>
        <span>
          {userDetails.firstName} {userDetails.surName}
        </span>

        <p
          className={classes.logout}
          onClick={() => {
            dispatch(initiateLogoutSession(navigate));
          }}
        >
          LOG OUT
        </p>
      </div>
    </div>
  );
};

export default SidebarAdmin;
