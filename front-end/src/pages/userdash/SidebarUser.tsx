import React, { useEffect } from "react";
import userstyles from "./userdash.module.css";
import circle from "../../assets/circle-half.png";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { initiateLogoutSession } from "../../features/authenticatedUserSlice";

import TranslataBtn from "../../components/TranslateBtn/TranslataBtn";

import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import { getAllUserAPI } from "../../features/alluserSlicer";
import { Notification } from "../../model/types/notification";
import { getAllRequestUserListAPI } from "../../features/requestUserListSlicer";
import { getAllFeedbackAPI } from "../../features/createdFeedbackSlicer";

const SidebarUser: React.FC = () => {
  const { t } = useTranslation<"trans">("trans");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );
  const notifications: Notification[] | undefined = useSelector(
    (state: RootState) => state.userNotifications.notifications
  );

  useEffect(() => {
    dispatch(getAllUserAPI());
  }, [dispatch]);

  const unReadNotifications =
    notifications?.filter((item) => !item.isRead).length || 0;

  return (
    <div>
      <div className="sidebar">
        <nav className="usernav">
          <ul>
            <NavLink to={"/"}>
              <img className="circle" src={circle} alt="circle" />
            </NavLink>
            <li>
              <NavLink to="/">{t("main")}</NavLink>
            </li>
            <li>
              <NavLink to="/notifications" className="notifications">
                <span>{t("notifs")}</span>
                {unReadNotifications > 0 ? (
                  <span className="badge">{unReadNotifications}</span>
                ) : (
                  ""
                )}
                {/* {unReadNotifications > 0 ? (
                  <span className="badge">{unReadNotifications}</span>
                ) : (
                  ""
                )} */}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/feedbackform"}>{t("givefb")}</NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/requestfeedback">{t("reqfb")}</NavLink>
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
            {t("logout")}
          </p>
        </div>
      </div>
      <TranslataBtn />
    </div>
  );
};

export default SidebarUser;
