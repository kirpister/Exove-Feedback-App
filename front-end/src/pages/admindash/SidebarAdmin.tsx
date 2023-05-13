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
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import TranslataBtn from "../../components/TranslateBtn/TranslataBtn";

const SidebarAdmin: React.FC = () => {
  const { t } = useTranslation<"trans">("trans");

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
    <div>
      <div className={styles.sidebar}>
        <nav className={styles.usernav}>
          <ul>
            <NavLink to={"/"}>
              <img className="circle" src={circle} alt="circle" />
            </NavLink>
            <NavLink to="/">
              <li>{t("main")}</li>
            </NavLink>
            <li>
              <NavLink to="/notifications" className={styles.notifications}>
                <span>{t("notifs")}</span>
                {unReadNotifications > 0 ? <span className={styles.badge}>{unReadNotifications}</span> : ""}
              </NavLink>
            </li>
            <li>
              <NavLink to="/feedbackform">{t("newform")}</NavLink>
            </li>
            {/* <li>
              <NavLink to="/getuserlist">{t("confirmation")}</NavLink>
            </li> */}
            <li>
              <NavLink to="/getuserlist">Get Request User List</NavLink>
            </li>
            <li>
              <NavLink to="/allfeedbacks">{t("allfbs")}</NavLink>
            </li>
          </ul>
        </nav>
        <div className="bottomdiv">
          <div className="bottom_avatar">
            <div className="avatar">{userDetails.firstName.charAt(0).toUpperCase()}</div>
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
            {t("logout")}
          </p>
        </div>
      </div>

      <TranslataBtn />
    </div>
  );
};

export default SidebarAdmin;
