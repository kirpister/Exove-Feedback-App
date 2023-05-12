import React, { Fragment, ReactComponentElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  AnswerType,
  CreatedFeebackType,
  getAllFeedbackAPI,
} from "../../../features/createdFeedbackSlicer";
import { PayloadTypeQuestion } from "../../../features/feedbackSlice";
import classes from "./allFeedback.module.css";
import UserAnswerDetail from "../userAnswer/UserAnswerDetail";
import Accordion from "react-bootstrap/Accordion";

const AllFeedbacks = () => {
  const { allCreatedFeedback } = useAppSelector(
    (state) => state.createdFeedback
  );
  const { allUserList } = useAppSelector((state) => state.allUser);
  console.log("alluserslist", allUserList);

  const renderLitOfQuestion = (listQuestion: Array<PayloadTypeQuestion>) => {
    console.log("list of questions", listQuestion);
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
  console.log("allcreatedfeedbacks", allCreatedFeedback);
  const renderAllFeedback = (list: Array<CreatedFeebackType>) => {
    if (list.length === 0) {
      return <div>NO Feedback List</div>;
    }
    return list.map((item, index) => {
      const {
        createAt,
        createdBy,
        details,
        id,
        requestedListBy,
        updatedAt,
        userList,
        answers,
      } = item;

      console.log("userlistforeachuser", userList);
      console.log("createdBy", createdBy);

      return (
        <Accordion defaultActiveKey="0" style={{ margin: "3rem" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header style={{ padding: "2rem" }}>
              {/* <div key={index}> */}
              <div className={classes.feedback_data}>
                <h3>
                  Feeback order: {index + 1} vs feedback ID: {id}
                </h3>
                <h2>Feedback Title:{details.title}</h2>
                <p>Created at: {createAt}</p>
                <p>Updated at : {updatedAt}</p>
                <p>List of questions : </p>
                <p>
                  requested by the list user request with id {requestedListBy}
                </p>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {/* <div className={classes.questions}>
                {renderLitOfQuestion(details.questions)}
              </div> */}
              {answers?.map((item, index) => {
                return (
                  <UserAnswerDetail
                    answerDetail={item}
                    index={index}
                    key={index}
                  />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    });
  };

  return (
    <>
      {/* <SidebarAdmin /> */}
      <div>
        <div style={{ color: "purple" }} className="dash-wrapper"></div>
        {renderAllFeedback(allCreatedFeedback)}
      </div>
    </>
  );
};

export default AllFeedbacks;
