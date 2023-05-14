import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SidebarAdmin from "./SidebarAdmin";
import styles from "./Admindash.module.css";
import axios from "axios";
import { personalDetailType } from "../../model/types/user";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../app/hooks";
import { setFeedbackRequest } from "../../features/answerFeedbackSlicer";

export interface DataType {
  data: {
    msg: string;
    data: personalDetailType;
  };
  status: number;
}

const Admindash: React.FC = () => {
  const { t } = useTranslation<"trans">("trans");

  const [user, setUsers] = useState<personalDetailType>();

  const userDetails = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get<personalDetailType[]>("/user").then((res) => {
      const { data, status } = res as unknown as DataType;
      const user = data.data;
      setUsers({ ...user });
      dispatch(setFeedbackRequest(user.feedBack));
    });
  }, [dispatch]);
  // console.log("USER", user);

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
                <td>{user.selfFeedbackRequests[0].requestFeedbackId.id}</td>
              </tr> */}
              <tr>
                <td>{t("tdstatus")}</td>
                <td>
                  {user.selfFeedbackRequests[0]?.requestFeedbackId.opened}{" "}
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

export default Admindash;

// {
//   <h2>
//     Welcome {userDetails?.firstName} !! You have {userDetails?.roles.join(", ")} roles
//   </h2>
// }
