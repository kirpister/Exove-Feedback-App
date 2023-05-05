import React, { Fragment, ReactComponentElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AnswerType, CreatedFeebackType, getAllFeedback } from "../../features/createdFeedbackSlicer";
import { PayloadTypeQuestion } from "../../features/feedbackSlice";
import classes from "./allFeedback.module.css";
import SidebarAdmin from "../../pages/admindash/SidebarAdmin";
const AllFeedbacks = () => {
  const { allCreatedFeedback } = useAppSelector((state) => state.createdFeedback);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getAllFeedback(dispatch);
  }, [dispatch]);
  const renderLitOfQuestion = (listQuestion: Array<PayloadTypeQuestion>) => {
    return listQuestion.map((item, index) => {
      const { title, order, type, required, result } = item;
      return (
        <div key={index}>
          <p>order: {order}</p>
          <p>question: {title}</p>
          <p>type : {type}</p>
          <p>result in case type question is "Selection"</p>
        </div>
      );
    });
  };
  const renderUserAnswer = (answerDetail: AnswerType<string, number>) => {
    const { details, finished, user } = answerDetail;
    return (
      <div>
        <p>User Id: {user.id}</p>
        <p>Name: {user.personalDetail.firstName}</p>
        <p>user answers:</p>
        <p>{finished ? "User finished answer" : "User have not answerd yet"}</p>

        {finished
          ? details.map((item, index) => {
              const { answers, question } = item;
              return (
                <Fragment key={index}>
                  <p>
                    question order: {question.order}. {question.title}
                  </p>
                  <p>
                    Answer:{" "}
                    {answers.map((answer, i) => {
                      return <Fragment key={index + i}>{answer}</Fragment>;
                    })}
                  </p>
                </Fragment>
              );
            })
          : ""}
      </div>
    );
  };
  const renderAllFeedback = (list: Array<CreatedFeebackType>) => {
    if (list.length === 0) {
      return <div>NO Feedback List</div>;
    }
    return list.map((item, index) => {
      const { createAt, createdBy, details, id, requestedListBy, updatedAt, userList, answers } = item;
      return (
        <div key={index}>
          <div className={classes.feedback_data}>
            <h3>
              Feeback order: {index + 1} vs feedback ID: {id}
            </h3>
            <h2>Feedback Tittle:{details.title}</h2>
            <div>create at: {createAt}</div>
            <div>updated at : {updatedAt}</div>
            <div>List of question : </div>
            <div>requested by the list user request with id {requestedListBy}</div>
          </div>
          <div className={classes.questions}>{renderLitOfQuestion(details.questions)}</div>
          <div>how user answer:</div>
          {answers.map((item, index) => {
            return <div className={classes[`${index % 2 ? "type_1" : "type_2"}`]}>{renderUserAnswer(item)}</div>;
          })}
        </div>
      );
    });
  };

  return (
    <>
      <SidebarAdmin />

      <div>
        <div style={{ color: "purple" }} className="dash-wrapper"></div>
        {renderAllFeedback(allCreatedFeedback)}
      </div>
    </>
  );
};

export default AllFeedbacks;
