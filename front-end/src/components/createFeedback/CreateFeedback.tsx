import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createFeedbackAPI, resetFeedback, setUpConfirmation } from "../../features/feedbackSlice";
import { useNavigate } from "react-router-dom";
import styles from "./createfb.module.css";
import BtnSuccess from "../button/success/BtnSuccess";
import { showLoading2s } from "../../features/loadingSlicer";

function CreateFeedback() {
  const { sendQuestion, listUserId, finalConfirm, sections } = useAppSelector((state) => state.feedback);
  const dispatch = useAppDispatch();
  const renderQuestion = () => {
    return sendQuestion.map((question, index) => {
      return (
        <div className={styles.form_wrapper}>
          <div className={styles.container}>
            <p>order: {question.order}</p>
            <p>
              title:
              {question.title}
            </p>
            <p>type: {question.type}</p>
            <BtnSuccess callBack={() => {}} name="remove" key={"1"} />
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <h2 className={styles.header}>Create feedback form</h2>
      <div>{renderQuestion()}</div>

      <BtnSuccess
        // className={styles.btn}
        // onClick={() => {
        //   if (finalConfirm) {
        //     createFeedbackAPI(finalConfirm)
        //       .then((res) => console.log(res))
        //       .catch((err) => console.log(err));
        //   }
        // }}
        callBack={() => {
          showLoading2s(dispatch);
          sendQuestion && localStorage.setItem("sendquestion", JSON.stringify(sendQuestion));
        }}
        name="Save"
      />
      <BtnSuccess
        callBack={() => {
          showLoading2s(dispatch);
          dispatch(resetFeedback());
        }}
        name="reset"
      />
      {/* <button
        className={styles.btn}
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button> */}
    </div>
  );
}

export default CreateFeedback;
