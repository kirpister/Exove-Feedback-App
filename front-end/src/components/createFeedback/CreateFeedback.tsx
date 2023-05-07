import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createFeedbackAPI, setUpConfirmation } from "../../features/feedbackSlice";
import { useNavigate } from "react-router-dom";
import styles from "./createfb.module.css";

function CreateFeedback() {
  const { sendQuestion, listUserId, finalConfirm, sections } = useAppSelector((state) => state.feedback);
  const { userDetails } = useAppSelector((state) => state.authenticatedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <h2 className={styles.header}>Create feedback form</h2>
      <div>{renderQuestion()}</div>
      {/* <button
        className={styles.btn}
        onClick={() => {
          if (userDetails) {
            dispatch(setUpConfirmation({  tittle: "giving first back" }));
          }
        }}
      >
        Confirm Final Feedback Form
      </button> */}
      <button
        className={styles.btn}
        onClick={() => {
          if (finalConfirm) {
            createFeedbackAPI(finalConfirm)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
        }}
      >
        Send feedback to backend
      </button>
      <button
        className={styles.btn}
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default CreateFeedback;
