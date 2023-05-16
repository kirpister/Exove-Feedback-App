import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AnswerType } from "../../../features/createdFeedbackSlicer";
import classes from "./userAnswerDetail.module.css";
import { goNextRouter } from "../../../services/helper";
import { useAppDispatch } from "../../../app/hooks";

interface Propstype {
  answerDetail: AnswerType<string, number>;
  index: number;
  feedbackrecipientUserName: string;
}

enum ReminderText {
  REMIND = "Remind",
  REMINDER_BEING_SEND = "Sending...",
  REMINDER_SENT_SUCCESSFULLY = "Reminder sent",
  REMINDER_SENT_ERROR = "Reminder sending failed...",
}

const UserAnswerDetail = (props: Propstype) => {
  const { answerDetail, index, feedbackrecipientUserName } = props;
  const [reminderText, setReminderText] = useState<string>(ReminderText.REMIND);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sendReminder = async (receiverUserId: string) => {
    setReminderText(ReminderText.REMINDER_BEING_SEND);
    const response = await axios.post("/user/notifications/reminder", {
      receiverUserId: receiverUserId,
      msg: `Please submit feedback for ${feedbackrecipientUserName}`,
    });
    const status = response.status;
    if (status === 201) {
      setReminderText(ReminderText.REMINDER_SENT_SUCCESSFULLY);
    } else {
      setReminderText(ReminderText.REMINDER_SENT_ERROR);
    }
  };
  const renderUserAnswer = (answerDetail: AnswerType<string, number>) => {
    const { finished, user } = answerDetail;
    // console.log("USER", user);
    return (
      <div
        onClick={() => {
          goNextRouter(dispatch, navigate, `${index}`, { answerDetail, index });
        }}
        // to={`${index}`}
        className={classes.link}
        // state={{ answerDetail, index }}
      >
        <div className={classes.single_user_feedback}>
          {/* <p>order number {index}</p>
        <p>User Id: {user.id}</p> */}
          <div className={classes.username}>
            <p>
              {user.personalDetail.firstName} {user.personalDetail.surName}
            </p>
          </div>

          {/* <p>user answers:</p> */}

          {finished ? (
            <p>User has finished feedback </p>
          ) : (
            <>
              <p>User has not given feedback yet </p>
              <button
                className={classes.btn}
                onClick={(e) => {
                  e.stopPropagation();
                  (reminderText === ReminderText.REMIND ||
                    reminderText === ReminderText.REMINDER_SENT_ERROR) &&
                    sendReminder(user.id);
                }}
              >
                {reminderText === ReminderText.REMIND && (
                  <i className="fa-regular fa-bell"></i>
                )}
                {reminderText === ReminderText.REMINDER_BEING_SEND && (
                  <i className="fas fa-spinner fa-spin"></i>
                )}
                {reminderText === ReminderText.REMINDER_SENT_SUCCESSFULLY && (
                  <i className="fa-solid fa-check"></i>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className={classes[`${index % 2 ? "type_1" : "type_2"}`]}>
      {renderUserAnswer(answerDetail)}
    </div>
  );
};

export default UserAnswerDetail;
