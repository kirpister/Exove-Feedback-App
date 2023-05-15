import React, { Fragment, ReactComponentElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  AnswerType,
  CreatedFeebackType,
  deleteFeedbackAPI,
  getAllFeedbackAPI,
} from "../../../features/createdFeedbackSlicer";
import { PayloadTypeQuestion } from "../../../features/feedbackSlice";
import classes from "./allFeedback.module.css";
import UserAnswerDetail from "../userAnswer/UserAnswerDetail";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import BtnError from "../../button/error/BtnError";
import { goNextRouter } from "../../../services/helper";

const AllFeedbacks = () => {
  let { allCreatedFeedback } = useAppSelector((state) => state.createdFeedback);
  const dispatch = useAppDispatch();
  const { allUserList } = useAppSelector((state) => state.allUser);
  const navigate = useNavigate();
  console.log("alluserslist", allUserList);
  console.log("allcreatedFeedback", allCreatedFeedback);

  // const renderLitOfQuestion = (listQuestion: Array<PayloadTypeQuestion>) => {
  //   // console.log("list of questions", listQuestion);
  //   return listQuestion.map((item, index) => {
  //     const { title, order, type, required, result } = item;
  //     return (
  //       <div key={index}>
  //         <p>order: {order}</p>
  //         <p>question: {title}</p>
  //         <p>type : {type}</p>
  //         <p>result in case type question is "Selection"</p>
  //       </div>
  //     );
  //   });
  // };
  const deleteFeedback = (feedbackId: string) => {
    const confirm = window.confirm(
      `are you sure to delete this feedback ? all the user's answers will be removed !`
    );
    confirm && dispatch(deleteFeedbackAPI(feedbackId));
  };
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

      const regex = /\^([\w-]+)\^/;
      const userId = details.title.match(regex)![1];
      let userResult = allUserList.find((user) => user.id === userId);

      return (
        <Accordion defaultActiveKey="1" style={{ margin: "1rem" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {/* <div key={index}> */}
              <div className={classes.feedback_data}>
                {/* <h3>
                  Feeback order: {index + 1} vs feedback ID: {id}
                </h3> */}
                {/* <h2>Feedback Title:{details.title}</h2> */}
                <h3>
                  {" "}
                  {userResult?.personalDetail.firstName}{" "}
                  {userResult?.personalDetail.surName} from{" "}
                  {userResult?.work.departments[0]} department
                </h3>
                {/* <p>Created at: {createAt}</p>
                <p>Updated at : {updatedAt}</p>
                <p>List of questions : </p> */}
                {/* <h3>
                  requested by the list user request with id {requestedListBy}
                </h3> */}
                {/* <Link to={`${id}/analytics`} className={classes.link}> */}

                <button
                  className={classes.btn}
                  onClick={() => {
                    // navigate(`${id}/analytics`, { state: { ...item, feedbackTo: userResult } });
                    goNextRouter(dispatch, navigate, `${id}/analytics`, {
                      ...item,
                      feedbackTo: userResult,
                    });
                  }}
                >
                  Graph
                </button>
                {/* </Link> */}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {/* <div className={classes.questions}>
                {renderLitOfQuestion(details.questions)}
              </div> */}
              {answers?.map((item, index) => {
                return (
                  <ListGroup>
                    <ListGroup.Item>
                      <UserAnswerDetail
                        answerDetail={item}
                        index={index}
                        key={index}
                        feedbackrecipientUserName={
                          userResult?.personalDetail.firstName +
                          " " +
                          userResult?.personalDetail.surName
                        }
                      />
                    </ListGroup.Item>
                  </ListGroup>
                );
              })}
              <BtnError
                callBack={() => {
                  deleteFeedback(item.id);
                }}
                name="Delete This Feedback"
              />
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
