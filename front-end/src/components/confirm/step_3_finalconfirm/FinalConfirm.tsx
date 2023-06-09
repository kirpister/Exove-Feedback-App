import React, { useEffect } from "react";
import SetupUserList from "../step_2_modify_the_list/SetupUserList";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import SingleUserList from "../step_2_modify_the_list/single_user_list/SingleUserList";
import BtnSuccess from "../../button/success/BtnSuccess";
import {
  createFeedbackAPI,
  setUpConfirmation,
} from "../../../features/feedbackSlice";
import styles from "./finalConfirm.module.css";
import { useNavigate } from "react-router-dom";

function FinalConfirm() {
  const { selectedRequesList } = useAppSelector(
    (state) => state.requestUserlist
  );

  const { finalConfirm } = useAppSelector((state) => state.feedback);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (finalConfirm) {
  //     createFeedbackAPI(finalConfirm, dispatch, navigate);
  //   }
  // }, [finalConfirm, dispatch, navigate]);
  useEffect(() => {
    dispatch(
      setUpConfirmation({
        title: `send feedback to is user Id: ^${selectedRequesList?.requestUserId}^`,
      })
    );
  }, [dispatch, selectedRequesList]);
  const sendToBackend = () => {
    const confirm = window.confirm(
      "are you sure to sent feedback request to those users"
    );
    if (confirm && finalConfirm) {
      createFeedbackAPI(finalConfirm, dispatch, navigate);
    }
  };

  return (
    <div className={styles.final_conformation}>
      <div className={styles.final_list}>
        {selectedRequesList && (
          <SingleUserList
            singleRequestedList={selectedRequesList}
            index={1}
            buttonName={"remove"}
          />
        )}
      </div>
      {/* <hr /> */}
      <div className={styles.two_btn}>
        <BtnSuccess
          callBack={() => {
            navigate(-1);
          }}
          name="Go Back"
        />
        <BtnSuccess
          callBack={() => {
            sendToBackend();
          }}
          name="Send To Users"
        />
      </div>
    </div>
  );
}

export default FinalConfirm;
