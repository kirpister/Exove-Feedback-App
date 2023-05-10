import React, { useEffect, useState } from "react";

import userstyles from "./userdash.module.css";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "axios";
import { personalDetailType } from "../../model/types/user";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
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

  const userDetails: any = useSelector((state: RootState) => state.authenticatedUser.userDetails);

  useEffect(() => {
    axios.get<personalDetailType[]>("/user").then((res) => {
      const { data, status } = res as unknown as DataType;
      const user = data.data;
      console.log(user)
      setUsers({ ...user });
    });
  }, []);

  const userInfo = () => {

    if (user) {
      const status = user.selfFeedbackRequests[0]?.requestFeedbackId?.opened;
   
      return (
        <>
          <table>
            <tbody>
              <tr>
                <td>Employee</td>
                <td>{user.personalDetail.firstName}</td>
              </tr>
              <tr>
                <td>Department</td>
                <td>{user.work.departments}</td>
              </tr>
              <tr>
                <td>Start Date</td>
                <td>{user.work.startDate}</td>
              </tr>
              {/* <tr>
                <td>Feedback Requests</td>
                <td>{user.selfFeedbackRequests[0].requestFeedbackId.id}</td>
              </tr> */}
              <tr>
                <td>Feedback status</td>
                <td>{user.selfFeedbackRequests[0].requestFeedbackId.opened } {status ? <p>Opened</p> : <p>Closed</p>}</td>
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
      <div className={userstyles.translatebtns}>
        <button className={userstyles.btn}>FI</button>
        <button className={userstyles.btn}>EN</button>
      </div>
    </main>
  );
};

export default Userdash;
