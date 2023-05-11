import React, { useEffect } from "react";
import circle from "../../assets/circle-half.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { initiateLogoutSession } from "../../features/authenticatedUserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styles from "./SidebarAdmin.module.css";
import { getAllRequestUserListAPI } from "../../features/requestUserListSlicer";
import { getAllFeedbackAPI } from "../../features/createdFeedbackSlicer";
import { getAllUserAPI } from "../../features/alluserSlicer";
import { Notification } from "../../model/types/notification";

const SidebarAdmin: React.FC = () => {
  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );
  const notifications: Notification[] | undefined = useSelector(
    (state: RootState) => state.userNotifications.notifications
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllRequestUserListAPI());
    dispatch(getAllFeedbackAPI());
    dispatch(getAllUserAPI());
  }, [dispatch]);
  const unReadNotifications =
    notifications?.filter((item) => !item.isRead).length || 0;
  return (
    <div className={styles.sidebar}>
      <nav className={styles.usernav}>
        <ul>
          <NavLink to={"/"}>
            <img className="circle" src={circle} alt="circle" />
          </NavLink>
          <li>
            <NavLink to="/notifications" className={styles.notifications}>
              <span>Notifications</span>
              {unReadNotifications > 0 ? (
                <span className={styles.badge}>{unReadNotifications}</span>
              ) : (
                ""
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/newform">New form</NavLink>
          </li>
          <li>
            <NavLink to="/confirmation">Confirmation</NavLink>
          </li>
          <li>
            <NavLink to="/getuserlist">Get Request User List</NavLink>
          </li>
          <li>
            <NavLink to="/allfeedbacks">All feedbacks</NavLink>
          </li>
        </ul>
      </nav>

      <div className="bottomdiv">
        <div className="bottom_avatar">
          <div className="avatar">
            {userDetails.firstName.charAt(0).toUpperCase()}
          </div>
          <span>
            {userDetails.firstName} {userDetails.surName}
          </span>
        </div>

        <p
          className="logout"
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
