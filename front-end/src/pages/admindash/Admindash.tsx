import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styles from "./Admindash.module.css";
import { personalDetailType } from "../../model/types/user";
import { useTranslation } from "react-i18next";

export interface DataType {
  data: {
    msg: string;
    data: personalDetailType;
  };
  status: number;
}

const Admindash: React.FC = () => {
  const { t } = useTranslation<"trans">("trans");

  const personalDetails = useSelector(
    (state: RootState) => state.authenticatedUser.personalDetails
  );

  const userInfo = () => {
    if (personalDetails) {
      const status = personalDetails.selfFeedbackRequests[0]?.requestFeedbackId?.opened;

      return (
        <>
          <table>
            <tbody>
              <tr>
                <td>{t("tdemployee")}</td>
                <td>{personalDetails.personalDetail.firstName}</td>
              </tr>
              <tr>
                <td>{t("tddepartment")}</td>
                <td>{personalDetails.work.departments}</td>
              </tr>
              <tr>
                <td>{t("tdstart")}</td>
                <td>{personalDetails.work.startDate}</td>
              </tr>
              {/* <tr>
                <td>Feedback Requests</td>
                <td>{personalDetails.selfFeedbackRequests[0].requestFeedbackId.id}</td>
              </tr> */}
              <tr>
                <td>{t("tdstatus")}</td>
                <td>
                  {personalDetails.selfFeedbackRequests[0]?.requestFeedbackId.opened}{" "}
                  {status ? <p>Opened</p> : <p>Closed</p>}
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
          {t("greeting")} {personalDetails?.personalDetail.firstName}!
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