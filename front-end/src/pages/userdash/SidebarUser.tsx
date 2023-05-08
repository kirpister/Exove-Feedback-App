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

const SidebarUser: React.FC = () => {
  const { t } = useTranslation<"trans">("trans");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );

  useEffect(()=> { 
    dispatch(getAllUserAPI());

  },[dispatch])

  return (
    <div className={userstyles.sidebar}>
      <nav className={userstyles.usernav}>
        <ul>
          <NavLink to={"/"}>
            <img className="circle" src={circle} alt="circle" />
          </NavLink>
          <NavLink to="/">
            <li>{t("lione")}</li>
          </NavLink>
          <li>{t("litwo")}</li>
          <NavLink to="/requestfeedback">
            <li>{t("lithree")}</li>
          </NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
        </ul>
      </nav>
      <div className={userstyles.bottomdiv}>
        <div className={userstyles.avatar}>
          {userDetails.firstName.charAt(0).toUpperCase()}
        </div>
        <span>
          {userDetails.firstName} {userDetails.surName}
        </span>

        <p
          className={userstyles.logout}
          onClick={() => {
            dispatch(initiateLogoutSession(navigate));
          }}
        >
          {t("logout")}
        </p>
      </div>
      <TranslataBtn />
    </div>
  );
};

export default SidebarUser;
