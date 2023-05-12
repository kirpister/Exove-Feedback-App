import React, { Fragment } from "react";
import { AnswerType } from "../../../features/createdFeedbackSlicer";
import classes from "./userAnswerDetail.module.css";
interface Propstype {
  answerDetail: AnswerType<string, number>;
  index: number;
}
const UserAnswerDetail = (props: Propstype) => {
  const { answerDetail, index } = props;
  const renderUserAnswer = (answerDetail: AnswerType<string, number>) => {
    const { details, finished, user } = answerDetail;
    return (
      <div>
        <p>order number {index}</p>
        <p>User Id: {user.id}</p>
        <p>Name: {user.personalDetail.firstName}</p>
        <p>user answers:</p>
        <p>{finished ? "User finished answer" : "User have not answerd yet"}</p>

        {details.map((item, index) => {
          const { answer, question } = item;
          return (
            <Fragment key={index}>
              <p>
                question order: {question.order}. {question.title}:
              </p>
              <p>Answer is {finished ? answer[0] : "not answer yet"}</p>
            </Fragment>
          );
        })}
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
