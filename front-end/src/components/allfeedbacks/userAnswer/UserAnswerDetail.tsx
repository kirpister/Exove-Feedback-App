import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnswerType } from "../../../features/createdFeedbackSlicer";
import classes from "./userAnswerDetail.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import { goNextRouter } from "../../../services/helper";
import { useAppDispatch } from "../../../app/hooks";

interface Propstype {
  answerDetail: AnswerType<string, number>;
  index: number;
}
const UserAnswerDetail = (props: Propstype) => {
  const { answerDetail, index } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const renderUserAnswer = (answerDetail: AnswerType<string, number>) => {
    const { finished, user } = answerDetail;
    // console.log("USER", user);
    return (
      <div
        onClick={() => {
          goNextRouter(dispatch, navigate, `${index}`,{answerDetail,index});
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
          <p>{finished ? "User has finished feedback" : "User has not given feedback yet"}</p>
          <button className={classes.btn}>
            <i className="fa-regular fa-bell"></i>
          </button>
        </div>
      </div>
    );
  };
  return <div className={classes[`${index % 2 ? "type_1" : "type_2"}`]}>{renderUserAnswer(answerDetail)}</div>;
};

export default UserAnswerDetail;
