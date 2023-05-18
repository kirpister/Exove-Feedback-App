import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { CheckedUser } from "../../model/types/user";
import { useNavigate } from "react-router-dom";

import userstyles from "./userdash.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import CreatedRequestFeedback from "./createdRequestFeedback/CreatedRequestFeedback";
import BtnSuccess from "../../components/button/success/BtnSuccess";
import { getPersonalDetailAPI } from "../../features/authenticatedUserSlice";

const RequestFeedback: React.FC = () => {
  const { t } = useTranslation<"trans">("trans");
  const { allUserList } = useAppSelector((state) => state.allUser);
  const { selfFeedbackRequests } = useAppSelector(
    (state) => state.requestFeedback
  );
  const [checkedUsers, setCheckedUsers] = useState<CheckedUser[]>([]);

  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    let userListId = [];
    if (checkedUsers.length > 1) {
      for (let user of checkedUsers) {
        userListId.push(user.id);
      }
    }
    const confirm = window.confirm("are you sure you want to send ?");
    confirm &&
      axios
        .post("user/feedback_request", { userListId: userListId })
        .then((response) => {
          alert("Success!");
          dispatch(getPersonalDetailAPI());
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            alert(error.response?.data.err.msg);
          }
        });
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    user: any
  ) => {
    const isChecked = e.target.checked;
    const userId = user.id;
    if (isChecked) {
      const checkedUser: CheckedUser = {
        id: userId,
        personalDetail: user.personalDetail,
      };

      setCheckedUsers((prevCheckedUsers) => [...prevCheckedUsers, checkedUser]);
    } else {
      setCheckedUsers((prevCheckedUsers) =>
        prevCheckedUsers.filter((checkedUser) => checkedUser.id !== userId)
      );
    }
  };

  const renderUser = (usersList: any) => {
    if (Array.isArray(usersList)) {
      return usersList.map((user) => {
        return (
          <article key={user.id} className={userstyles.userlist}>
            <input
              type="checkbox"
              id={user.id}
              value={user.id}
              onChange={(e) => handleCheckboxChange(e, user)}
            />
            <div className={userstyles.avatar}>
              {user.personalDetail.firstName.charAt(0).toUpperCase()}
            </div>
            <span>
              {user.personalDetail.firstName} {user.personalDetail.surName}
              <br />
              {user.work.departments}
            </span>
          </article>
        );
      });
    }
  };

  return (
    <main className={userstyles.usermain}>
      <div className={userstyles.userdash}>
        <h2>{t("header")}</h2>
        <p>{t("reqparagraph")}</p>
        <div className={userstyles.users}>{renderUser(allUserList)}</div>
        <BtnSuccess
          callBack={handleSubmit}
          name={t("subbtn")}
          disabled={selfFeedbackRequests.length > 0 ? true : false}
        />
        <CreatedRequestFeedback />
      </div>
      <div></div>
    </main>
  );
};

export default RequestFeedback;
