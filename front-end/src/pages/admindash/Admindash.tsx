import React from "react";
import styles from "./Admindash.module.css";
import { personalDetailType } from "../../model/types/user";
import { useTranslation } from "react-i18next";
import {  useAppSelector } from "../../app/hooks";

export interface DataType {
  data: {
    msg: string;
    data: personalDetailType;
  };
  status: number;
}

const Admindash: React.FC = () => {
  const { t } = useTranslation<"trans">("trans");
  const { userDetails, personalDetails: user } = useAppSelector((state) => state.authenticatedUser);
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
              {/* <tr>
                <td>Feedback Requests</td>
                <td>{personalDetails.selfFeedbackRequests[0].requestFeedbackId.id}</td>
              </tr> */}
              <tr>
                <td>{t("tdstatus")}</td>
                <td>
                  {user.selfFeedbackRequests[0]?.requestFeedbackId.opened} {status ? <p>Opened</p> : <p>Closed</p>}
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
    <main>
      <div className={styles.admindash}>
        <h2>
          {t("greeting")} {user?.personalDetail.firstName}!
        </h2>
        <p>
          {t("date")} {new Date().toLocaleDateString()}
        </p>
        <div>{userInfo()}</div>
      </div>
    </main>
  );
};

export default Admindash;

