import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BtnSuccess from "../../button/success/BtnSuccess";
import { useDispatch } from "react-redux";
import { goBackRouter } from "../../../services/helper";
//import { AnswerType } from "../../../features/createdFeedbackSlicer";
// import classes from "./Singlefeedback.module.css";
//import ListGroup from "react-bootstrap/ListGroup";
import styles from './Singlefeedback.module.css';

interface Propstype {
  answerDetail?: any;
  index?: number;
}
const SingleUserFeedback = (props: Propstype) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { answerDetail } = location.state;

  // console.log("AnswerDetail", answerDetail);

  const renderUserAnswer = (answerDetailData: any) => {
    const { details, finished, user } = answerDetailData;
    return (
      <div className={styles.feedbackwrapper}>
        {/* <p>order number {index}</p>
        <p>User Id: {user.id}</p> */}
        <div>
          <h3 className={styles.h3header}>
            This feedback was given by {user.personalDetail.firstName} {user.personalDetail.surName}
          </h3>
        </div>

        {details.map((item: any, index: any) => {
          const { answer, question } = item;
          return (
            <Fragment key={index}>
              <>
              <div className={styles.question}><p>
                <p className={styles.number}>{question.order}.</p> {question.title}:</p></div>
              <p>Answer is {finished ? answer[0] : "Feedback has not been given yet"}.</p>
              </>
            </Fragment>
          );
        })}
      </div>
    );
  };
  return (
    <div className={styles.wrapper}>
      {renderUserAnswer(answerDetail ? answerDetail : props.answerDetail)}
      {answerDetail && (
        <BtnSuccess
          callBack={() => {
            goBackRouter(dispatch, navigate);
          }}
          name="Go Back"
        />
      )}
    </div>
  );
};

export default SingleUserFeedback;
