import React, { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import BtnError from "../../../components/button/error/BtnError";
import { deleteRequestFeedbackAPI } from "../../../features/requestFeedback";
import styles from "./createRequestFeedback.module.css";
import SingleUserList from "../../../components/confirm/step_2_modify_the_list/single_user_list/SingleUserList";

import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

function CreatedRequestFeedback() {
  const { t } = useTranslation<"trans">("trans");
  const { selfFeedbackRequests } = useAppSelector((state) => state.requestFeedback);
  const { allUserList } = useAppSelector((state) => state.allUser);
  console.log(selfFeedbackRequests);
  const dispatch = useAppDispatch();
  const renderRequestFeeback = () => {
    if (selfFeedbackRequests.length > 0) {
      return selfFeedbackRequests.map((selfFeedbackRequest, index) => {
        return (
          <div key={index}>
            <p>Your request list has {selfFeedbackRequest.requestFeedbackId.opened ? " " : "not"} opened yet</p>
            {selfFeedbackRequest.requestFeedbackId.userList.map((userId, index_1) => {
              return (
                <tr>
                  <span style={{padding: ".4rem"}}>{index_1 + 1}</span>
                  <td key={index_1}>{allUserList.find((e) => e.id === userId)?.personalDetail.firstName}</td>
                  <td key={index_1}>{allUserList.find((e) => e.id === userId)?.personalDetail.surName}</td>
                  <td key={index_1}>{allUserList.find((e) => e.id === userId)?.work.departments[0]}</td>
                </tr>
              );
            })}
            <BtnError
              callBack={() => {
                deleteRequestFeedback(selfFeedbackRequest.requestFeedbackId.id);
              }}
              name={t("deletebtn")}
            />
          </div>
        );
      });
    }
    return <p>You have no self request feedback</p>;
  };
  const deleteRequestFeedback = (id: string) => {
    const confirm = window.confirm("are you sure to delete ?");
    confirm && dispatch(deleteRequestFeedbackAPI(id));
  };

  return selfFeedbackRequests.length > 0 ? (
    <div className={styles.requestwrapper}>
      <table>
        <thead>
          <h2>{t("selectedusers")}</h2>
        </thead>
        <tbody>{renderRequestFeeback()}</tbody>
      </table>
    </div>
  ) : (
    <></>
  );
}

export default CreatedRequestFeedback;
