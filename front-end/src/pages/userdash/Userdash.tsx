import React, { useEffect, useState } from "react";

import userstyles from "./userdash.module.css";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "axios";
import { personalDetailType } from "../../model/types/user";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFeedbackRequest } from "../../features/answerFeedbackSlicer";
import { setAllRequestFeedback } from "../../features/requestFeedback";
export interface DataType {
  data: {
    msg: string;
    data: personalDetailType;
  };
  status: number;
}

const Userdash: React.FC = () => {
  const { t } = useTranslation<"trans">("trans");

  const [user, setUsers] = useState<personalDetailType>();

  const {userDetails} = useAppSelector((state) => state.authenticatedUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.get<personalDetailType[]>("/user").then((res) => {
      const { data, status } = res as unknown as DataType;
      const user = data.data;
      setUsers({ ...user });
      dispatch(setFeedbackRequest(user.feedBack));
      dispatch(setAllRequestFeedback(user.selfFeedbackRequests));
    });
  }, [dispatch]);

  const userInfo = () => {
    if (user) {
      const status = user.selfFeedbackRequests[0]?.requestFeedbackId?.opened;

      return (
        <>
          <table>
            <tbody>
              <tr>
                <td>{t("tdemployee")}</td>
                <td>{user.personalDetail.firstName}</td>
              </tr>
              <tr>
                <td>{t("tddepartment")}</td>
                <td>{user.work.departments}</td>
              </tr>
              <tr>
                <td>{t("tdstart")}</td>
                <td>{user.work.startDate}</td>
              </tr>
              <tr>
                <td>{t("tdstatus")}</td>
                <td>
                  {user.selfFeedbackRequests[0]?.requestFeedbackId.opened} {status ? "Opened" : "Closed"}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      );
    } else {
      return <p>Nothing?!?</p>;
    }
  };

  return (
    <main className={userstyles.usermain}>
      <div className={userstyles.userdash}>
        <h2>
          {t("greeting")} {userDetails?.firstName}!
        </h2>
        <p>
          {t("date")} {new Date().toLocaleDateString()}
        </p>
        <div>{userInfo()}</div>
      </div>
    </main>
  );
};

export default Userdash;
