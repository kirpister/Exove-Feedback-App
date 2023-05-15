import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
//import { AnswerType } from "../../../features/createdFeedbackSlicer";
// import classes from "./Singlefeedback.module.css";
//import ListGroup from "react-bootstrap/ListGroup";

// interface Propstype {
//   answerDetail: any;
//   index: number;
// }
const SingleUserFeedback = (props: any) => {
  const location = useLocation();

  const { answerDetail } = location.state;

  // console.log("AnswerDetail", answerDetail);

  const renderUserAnswer = (answerDetailData: any) => {
    const { details, finished, user } = answerDetailData;
    // console.log("USER", user);

    return (
      <div>
        {/* <p>order number {index}</p>
        <p>User Id: {user.id}</p> */}
        <div>
          <h3>
            This feedback was done by {user.personalDetail.firstName}{" "}
            {user.personalDetail.surName}
          </h3>
        </div>

        {details.map((item: any, index: any) => {
          const { answer, question } = item;
          return (
            <Fragment key={index}>
              <p>
                {question.order}. {question.title}:
              </p>
              <p>Answer is {finished ? answer[0] : "not answer yet"}</p>
            </Fragment>
          );
        })}
      </div>
    );
  };
  return <div>{renderUserAnswer(answerDetail)}</div>;
};

export default SingleUserFeedback;
