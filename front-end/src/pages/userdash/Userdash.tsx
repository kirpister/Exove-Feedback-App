import React from "react";
import userstyles from "./userdash.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { personalDetailType } from "../../model/types/user";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFeedbackRequest } from "../../features/answerFeedbackSlicer";
import { setAllRequestFeedback } from "../../features/requestFeedback";
import { getPersonalDetailAPI } from "../../features/authenticatedUserSlice";
export interface DataType {
  data: {
    msg: string;
    data: personalDetailType;
  };
  status: number;
}

const Userdash: React.FC = () => {
  const { t } = useTranslation<"trans">("trans");

  const { userDetails, personalDetails } = useAppSelector((state) => state.authenticatedUser);
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
              <tr>
                <td>{t("tdstatus")}</td>
                <td>
                  {personalDetails.selfFeedbackRequests[0]?.requestFeedbackId.opened} {status ? "Opened" : "Closed"}
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

export default Userdash;
